const pool = require('../../config/db');

const create = async (tipo_rol) => {
  const [result] = await pool.execute(
    'INSERT INTO ROL (tipo_rol) VALUES (?)',
    [tipo_rol]
  );
  return { id: result.insertId, tipo_rol };
};

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM ROL ORDER BY tipo_rol ASC');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM ROL WHERE id_rol = ?', [id]);
  return rows[0] || null;
};

const update = async (id, tipo_rol) => {
  const [result] = await pool.execute(
    'UPDATE ROL SET tipo_rol = ? WHERE id_rol = ?',
    [tipo_rol, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM ROL WHERE id_rol = ?', [id]);
  return result.affectedRows

};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
  