const pool = require('../../config/db');

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM DEPARTAMENTO ORDER BY nombre ASC');
  return rows;
};

const create = async (nombre) => {
  const [result] = await pool.execute(
    'INSERT INTO DEPARTAMENTO (nombre) VALUES (?)',
    [nombre]
  );
  return { id: result.insertId, nombre };
};

module.exports = {
  getAll,
  create,
};