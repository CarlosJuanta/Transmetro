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

const update = async (id, nombre) => {
    const [result] = await pool.execute(
      'UPDATE DEPARTAMENTO SET nombre = ? WHERE id_departamento = ?',
      [nombre, id]
    );
    return result.affectedRows;
};

const remove = async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM DEPARTAMENTO WHERE id_departamento = ?',
      [id]
    );
    return result.affectedRows;
};

module.exports = {
  getAll,
  create,
  update,
  remove
};