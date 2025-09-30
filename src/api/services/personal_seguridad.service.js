const pool = require('../../config/db');

const create = async (nombre, apellido, telefono) => {
  const [result] = await pool.execute(
    'INSERT INTO PERSONAL_SEGURIDAD (nombre, apellido, telefono) VALUES (?, ?, ?)',
    [nombre, apellido, telefono]
  );
  return { id: result.insertId, nombre, apellido, telefono };
};

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM PERSONAL_SEGURIDAD ORDER BY apellido, nombre ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM PERSONAL_SEGURIDAD WHERE id_personal = ?', [id]);
  return rows[0] || null;
};

const update = async (id, nombre, apellido, telefono) => {
  const [result] = await pool.execute(
    'UPDATE PERSONAL_SEGURIDAD SET nombre = ?, apellido = ?, telefono = ? WHERE id_personal = ?',
    [nombre, apellido, telefono, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM PERSONAL_SEGURIDAD WHERE id_personal = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};