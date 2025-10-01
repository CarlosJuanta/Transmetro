const pool = require('../../config/db');

const registrarLlegada = async (id_bus, id_estacion, pasajeros_registrados) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [registroResult] = await connection.execute(
      'INSERT INTO REGISTRO_OPERACION (id_bus, id_estacion, pasajeros_registrados, fecha_hora_llegada_real) VALUES (?, ?, ?, NOW())',
      [id_bus, id_estacion, pasajeros_registrados]
    );
    const newRegistroId = registroResult.insertId;

    const [busRows] = await connection.execute('SELECT capacidad_maxima FROM BUS WHERE id_bus = ?', [id_bus]);
    if (busRows.length === 0) {
      throw new Error('El bus especificado no existe.');
    }
    const capacidadBus = busRows[0].capacidad_maxima;

    let alertaCreada = null;
    const ocupacion = pasajeros_registrados / capacidadBus;

    const UMBRAL_SOBREDEMANDA = 0.50; // 50%
    const UMBRAL_BAJA_OCUPACION = 0.25; // 25%

    const TIPO_ALERTA_SOBREDEMANDA = 1;
    const TIPO_ALERTA_BAJA_OCUPACION = 2;
    const ESTADO_ALERTA_GENERADA = 1;

    if (ocupacion >= UMBRAL_SOBREDEMANDA) {
      const descripcion = `Demanda del ${Math.round(ocupacion * 100)}% reportada.`;
      const [alertaResult] = await connection.execute(
        'INSERT INTO ALERTA (id_registro_operacion, id_tipo_alerta, id_estado_alerta, fecha_hora, descripcion) VALUES (?, ?, ?, NOW(), ?)',
        [newRegistroId, TIPO_ALERTA_SOBREDEMANDA, ESTADO_ALERTA_GENERADA, descripcion]
      );
      alertaCreada = { id: alertaResult.insertId, tipo: 'SOBREDEMANDA' };
    } else if (ocupacion <= UMBRAL_BAJA_OCUPACION) {
      const descripcion = `Ocupación del ${Math.round(ocupacion * 100)}% reportada.`;
      const [alertaResult] = await connection.execute(
        'INSERT INTO ALERTA (id_registro_operacion, id_tipo_alerta, id_estado_alerta, fecha_hora, descripcion) VALUES (?, ?, ?, NOW(), ?)',
        [newRegistroId, TIPO_ALERTA_BAJA_OCUPACION, ESTADO_ALERTA_GENERADA, descripcion]
      );
      alertaCreada = { id: alertaResult.insertId, tipo: 'BAJA_OCUPACION' };
    }

    await connection.commit();

    return {
      id_registro: newRegistroId,
      alerta: alertaCreada,
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const registrarSalida = async (id_registro) => {
    const [result] = await pool.execute(
      'UPDATE REGISTRO_OPERACION SET fecha_hora_salida_real = NOW() WHERE id_registro = ?',
      [id_registro]
    );
    return result.affectedRows;
};


module.exports = {
  registrarLlegada,
  registrarSalida
};