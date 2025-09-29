const pool = require('../../config/db');

const create = async (nombre, id_estacion) => {
  const [result] = await pool.execute(
    'INSERT INTO ACCESO (nombre, id_estacion) VALUES (?, ?)',
    [nombre, id_estacion]
  );
  return { id: result.insertId, nombre, id_estacion };
};

const getByEstacionId = async (id_estacion) => {
  const [rows] = await pool.execute(
    'SELECT * FROM ACCESO WHERE id_estacion = ?',
    [id_estacion]
  );
  return rows;
};

const getById = async (id_acceso) => {
  const [rows] = await pool.execute(
    'SELECT * FROM ACCESO WHERE id_acceso = ?',
    [id_acceso]
  );
  return rows[0] || null;
};

const update = async (id_acceso, nombre) => {
  const [result] = await pool.execute(
    'UPDATE ACCESO SET nombre = ? WHERE id_acceso = ?',
    [nombre, id_acceso]
  );
  return result.affectedRows;
};

const remove = async (id_acceso) => {
  const [result] = await pool.execute('DELETE FROM ACCESO WHERE id_acceso = ?', [id_acceso]);
  return result.affectedRows;
};


module.exports = {
  create,
  getByEstacionId,
  getById,
  update,
  remove,
};