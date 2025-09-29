const pool = require('../../config/db');

const create = async (nombre, id_municipalidad) => {
  const [result] = await pool.execute(
    'INSERT INTO LINEA (nombre, id_municipalidad) VALUES (?, ?)',
    [nombre, id_municipalidad]
  );
  return { id: result.insertId, nombre, id_municipalidad };
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT 
      l.id_linea, 
      l.nombre, 
      m.id_municipalidad,
      m.nombre AS nombre_municipalidad
     FROM LINEA l
     JOIN MUNICIPALIDAD m ON l.id_municipalidad = m.id_municipalidad
     ORDER BY l.nombre ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [lineaRows] = await pool.execute(
    `SELECT 
      l.id_linea, 
      l.nombre, 
      m.id_municipalidad,
      m.nombre AS nombre_municipalidad
     FROM LINEA l
     JOIN MUNICIPALIDAD m ON l.id_municipalidad = m.id_municipalidad
     WHERE l.id_linea = ?`,
    [id]
  );

  if (lineaRows.length === 0) {
    return null;
  }

  const [rutaRows] = await pool.execute(
    `SELECT 
      r.numero_parada,
      r.distancia_siguiente_parada,
      e.id_estacion,
      e.nombre AS nombre_estacion
     FROM RUTA r
     JOIN ESTACION e ON r.id_estacion = e.id_estacion
     WHERE r.id_linea = ?
     ORDER BY r.numero_parada ASC`,
    [id]
  );

  const linea = lineaRows[0];
  linea.ruta = rutaRows;

  return linea;
};

const update = async (id, nombre, id_municipalidad) => {
  const [result] = await pool.execute(
    'UPDATE LINEA SET nombre = ?, id_municipalidad = ? WHERE id_linea = ?',
    [nombre, id_municipalidad, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM LINEA WHERE id_linea = ?', [id]);
  return result.affectedRows;
};

const updateRuta = async (id_linea, ruta) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM RUTA WHERE id_linea = ?', [id_linea]);

    if (ruta && ruta.length > 0) {
      for (const parada of ruta) {
        await connection.execute(
          'INSERT INTO RUTA (id_linea, id_estacion, numero_parada, distancia_siguiente_parada) VALUES (?, ?, ?, ?)',
          [id_linea, parada.id_estacion, parada.numero_parada, parada.distancia_siguiente_parada]
        );
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  updateRuta,
};