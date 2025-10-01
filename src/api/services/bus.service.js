const pool = require('../../config/db');

const checkBusLimit = async (id_linea) => {
    if (!id_linea) {
        return;
    }

    const [stationRows] = await pool.execute('SELECT COUNT(DISTINCT id_estacion) as totalEstaciones FROM RUTA WHERE id_linea = ?', [id_linea]);
    const totalEstaciones = stationRows[0].totalEstaciones;

    if (totalEstaciones === 0) {
        return;
    }

    const [busRows] = await pool.execute('SELECT COUNT(*) as totalBuses FROM BUS WHERE id_linea = ?', [id_linea]);
    const totalBuses = busRows[0].totalBuses;
    
    const maxBuses = totalEstaciones * 2;

    if (totalBuses >= maxBuses) {
        const err = new Error(`No se puede asignar el bus. La línea ya ha alcanzado su límite máximo de ${maxBuses} buses.`);
        err.code = 'BUSINESS_RULE_VIOLATION';
        throw err;
    }
};

const create = async (placa, capacidad_maxima, id_linea, id_parqueo) => {
  await checkBusLimit(id_linea);
  const [result] = await pool.execute(
    'INSERT INTO BUS (placa, capacidad_maxima, id_linea, id_parqueo) VALUES (?, ?, ?, ?)',
    [placa, capacidad_maxima, id_linea, id_parqueo]
  );
  return { id: result.insertId, placa, capacidad_maxima, id_linea, id_parqueo };
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT 
      b.id_bus, b.placa, b.capacidad_maxima, l.id_linea, l.nombre AS nombre_linea,
      p.id_parqueo, p.nombre AS nombre_parqueo
     FROM BUS b
     LEFT JOIN LINEA l ON b.id_linea = l.id_linea
     JOIN PARQUEO p ON b.id_parqueo = p.id_parqueo
     ORDER BY b.placa ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT 
      b.id_bus, b.placa, b.capacidad_maxima, l.id_linea, l.nombre AS nombre_linea,
      p.id_parqueo, p.nombre AS nombre_parqueo, e.id_estacion, e.nombre AS nombre_estacion_parqueo
     FROM BUS b
     LEFT JOIN LINEA l ON b.id_linea = l.id_linea
     JOIN PARQUEO p ON b.id_parqueo = p.id_parqueo
     JOIN ESTACION e ON p.id_estacion = e.id_estacion
     WHERE b.id_bus = ?`,
    [id]
  );
  return rows[0] || null;
};

const update = async (id, placa, capacidad_maxima, id_linea, id_parqueo) => {
  const [busRows] = await pool.execute('SELECT id_linea FROM BUS WHERE id_bus = ?', [id]);
  if (busRows.length === 0) {
    return 0;
  }
  const lineaActual = busRows[0].id_linea;
  
  if (lineaActual !== id_linea && id_linea !== null) {
      await checkBusLimit(id_linea);
  }
  
  const [result] = await pool.execute(
    'UPDATE BUS SET placa = ?, capacidad_maxima = ?, id_linea = ?, id_parqueo = ? WHERE id_bus = ?',
    [placa, capacidad_maxima, id_linea, id_parqueo, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM BUS WHERE id_bus = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};