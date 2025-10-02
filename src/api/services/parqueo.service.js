const pool = require('../../config/db');

const create = async (nombre, id_estacion) => {
  const [result] = await pool.execute('INSERT INTO PARQUEO (nombre, id_estacion) VALUES (?, ?)', [nombre, id_estacion]);
  return { id: result.insertId, nombre, id_estacion };
};

const getAll = async () => {
    const [rows] = await pool.execute(
      `SELECT p.id_parqueo, p.nombre, p.id_estacion, e.nombre AS nombre_estacion
       FROM PARQUEO p
       JOIN ESTACION e ON p.id_estacion = e.id_estacion
       ORDER BY e.nombre ASC, p.nombre ASC`
    );
    return rows;
};

const getByEstacionId = async (id_estacion) => {
  const [rows] = await pool.execute('SELECT * FROM PARQUEO WHERE id_estacion = ?', [id_estacion]);
  return rows;
};

const getById = async (id_parqueo) => {
  const [rows] = await pool.execute('SELECT * FROM PARQUEO WHERE id_parqueo = ?', [id_parqueo]);
  return rows[0] || null;
};

const update = async (id_parqueo, nombre) => {
  const [result] = await pool.execute('UPDATE PARQUEO SET nombre = ? WHERE id_parqueo = ?', [nombre, id_parqueo]);
  return result.affectedRows;
};

const remove = async (id_parqueo) => {
  const [result] = await pool.execute('DELETE FROM PARQUEO WHERE id_parqueo = ?', [id_parqueo]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getByEstacionId,
  getById,
  update,
  remove,
};