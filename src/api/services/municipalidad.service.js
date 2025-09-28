const pool = require('../../config/db');

const create = async (nombre, id_departamento) => {
  const [result] = await pool.execute(
    'INSERT INTO MUNICIPALIDAD (nombre, id_departamento) VALUES (?, ?)',
    [nombre, id_departamento]
  );
  return { id: result.insertId, nombre, id_departamento };
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT 
      m.id_municipalidad, 
      m.nombre, 
      d.id_departamento,
      d.nombre AS nombre_departamento 
     FROM MUNICIPALIDAD m
     JOIN DEPARTAMENTO d ON m.id_departamento = d.id_departamento
     ORDER BY m.nombre ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT 
      m.id_municipalidad, 
      m.nombre, 
      d.id_departamento,
      d.nombre AS nombre_departamento 
     FROM MUNICIPALIDAD m
     JOIN DEPARTAMENTO d ON m.id_departamento = d.id_departamento
     WHERE m.id_municipalidad = ?`,
    [id]
  );
  return rows[0] || null;
};

const update = async (id, nombre, id_departamento) => {
  const [result] = await pool.execute(
    'UPDATE MUNICIPALIDAD SET nombre = ?, id_departamento = ? WHERE id_municipalidad = ?',
    [nombre, id_departamento, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM MUNICIPALIDAD WHERE id_municipalidad = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};