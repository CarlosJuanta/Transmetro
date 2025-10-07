const pool = require('../../config/db');

const create = async (pilotoData) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { nombre, apellido, fecha_nacimiento, dpi, direccion_residencia, telefono_celular, escolaridad } = pilotoData;
    const [pilotoResult] = await connection.execute(
      'INSERT INTO PILOTO (nombre, apellido, fecha_nacimiento, dpi, direccion_residencia, telefono_celular) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, fecha_nacimiento, dpi, direccion_residencia, telefono_celular]
    );
    const newPilotId = pilotoResult.insertId;
    if (escolaridad && escolaridad.length > 0) {
      for (const estudio of escolaridad) {
        await connection.execute(
          'INSERT INTO ESCOLARIDAD_PILOTO (id_piloto, grado_academico, institucion_academica, anio_finalizacion) VALUES (?, ?, ?, ?)',
          [newPilotId, estudio.grado_academico, estudio.institucion_academica, estudio.anio_finalizacion]
        );
      }
    }
    await connection.commit();
    return { id: newPilotId, ...pilotoData };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM PILOTO ORDER BY apellido, nombre ASC');
  return rows;
};

const getById = async (id) => {
  const [pilotoRows] = await pool.execute('SELECT * FROM PILOTO WHERE id_piloto = ?', [id]);
  if (pilotoRows.length === 0) {
    return null;
  }
  const [escolaridadRows] = await pool.execute('SELECT * FROM ESCOLARIDAD_PILOTO WHERE id_piloto = ? ORDER BY anio_finalizacion ASC', [id]);
  const piloto = pilotoRows[0];
  piloto.escolaridad = escolaridadRows;
  return piloto;
};

const update = async (id, pilotoData) => {
  const connection = await pool.getConnection();
  try {
      await connection.beginTransaction();
      const { nombre, apellido, fecha_nacimiento, dpi, direccion_residencia, telefono_celular, escolaridad } = pilotoData;

      await connection.execute(
          'UPDATE PILOTO SET nombre = ?, apellido = ?, fecha_nacimiento = ?, dpi = ?, direccion_residencia = ?, telefono_celular = ? WHERE id_piloto = ?',
          [nombre, apellido, fecha_nacimiento, dpi, direccion_residencia, telefono_celular, id]
      );

      await connection.execute('DELETE FROM ESCOLARIDAD_PILOTO WHERE id_piloto = ?', [id]);

      if (escolaridad && escolaridad.length > 0) {
          for (const estudio of escolaridad) {
              await connection.execute(
                'INSERT INTO ESCOLARIDAD_PILOTO (id_piloto, grado_academico, institucion_academica, anio_finalizacion) VALUES (?, ?, ?, ?)',
                [id, estudio.grado_academico, estudio.institucion_academica, estudio.anio_finalizacion]
              );
          }
      }

      await connection.commit();
      const [pilotoActualizado] = await pool.execute('SELECT * FROM PILOTO WHERE id_piloto = ?', [id]);
      return pilotoActualizado[0];

  } catch (error) {
      await connection.rollback();
      throw error;
  } finally {
      connection.release();
  }
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM PILOTO WHERE id_piloto = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};