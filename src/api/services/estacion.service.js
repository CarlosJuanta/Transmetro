const pool = require('../../config/db');

const create = async (nombre, id_municipalidad) => {
  const [result] = await pool.execute(
    'INSERT INTO ESTACION (nombre, id_municipalidad) VALUES (?, ?)',
    [nombre, id_municipalidad]
  );
  return { id: result.insertId, nombre, id_municipalidad };
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT 
      e.id_estacion, 
      e.nombre, 
      m.id_municipalidad,
      m.nombre AS nombre_municipalidad,
      d.nombre AS nombre_departamento
     FROM ESTACION e
     JOIN MUNICIPALIDAD m ON e.id_municipalidad = m.id_municipalidad
     JOIN DEPARTAMENTO d ON m.id_departamento = d.id_departamento
     ORDER BY e.nombre ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [estacionRows] = await pool.execute(
    `SELECT 
      e.id_estacion, 
      e.nombre, 
      m.id_municipalidad,
      m.nombre AS nombre_municipalidad,
      d.nombre AS nombre_departamento
     FROM ESTACION e
     JOIN MUNICIPALIDAD m ON e.id_municipalidad = m.id_municipalidad
     JOIN DEPARTAMENTO d ON m.id_departamento = d.id_departamento
     WHERE e.id_estacion = ?`,
    [id]
  );

  if (estacionRows.length === 0) {
    return null;
  }

  const [accesosRows] = await pool.execute('SELECT * FROM ACCESO WHERE id_estacion = ?', [id]);
  const [parqueosRows] = await pool.execute('SELECT * FROM PARQUEO WHERE id_estacion = ?', [id]);

  const estacion = estacionRows[0];
  estacion.accesos = accesosRows;
  estacion.parqueos = parqueosRows;

  return estacion;
};

const update = async (id, nombre, id_municipalidad) => {
  const [result] = await pool.execute(
    'UPDATE ESTACION SET nombre = ?, id_municipalidad = ? WHERE id_estacion = ?',
    [nombre, id_municipalidad, id]
  );
  return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM ESTACION WHERE id_estacion = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};