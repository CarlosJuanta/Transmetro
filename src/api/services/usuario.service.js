const pool = require('../../config/db');
const { hashPassword } = require('../../utils/password.utils');

const create = async (userData) => {
  const { correo, contrasenia, nombre, apellido, id_rol, id_estacion } = userData;

  const hashedPassword = await hashPassword(contrasenia);

  const [result] = await pool.execute(
    'INSERT INTO USUARIO (correo, contrasenia, nombre, apellido, id_rol, id_estacion) VALUES (?, ?, ?, ?, ?, ?)',
    [correo, hashedPassword, nombre, apellido, id_rol, id_estacion || null]
  );

  const [rows] = await pool.execute('SELECT id_usuario, correo, nombre, apellido, id_rol, id_estacion FROM USUARIO WHERE id_usuario = ?', [result.insertId]);
  return rows[0];
};

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT 
      u.id_usuario, 
      u.correo, 
      u.nombre, 
      u.apellido, 
      r.id_rol, 
      r.tipo_rol, 
      e.id_estacion, 
      e.nombre as nombre_estacion
     FROM USUARIO u
     JOIN ROL r ON u.id_rol = r.id_rol
     LEFT JOIN ESTACION e ON u.id_estacion = e.id_estacion
     ORDER BY u.apellido, u.nombre ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT 
      u.id_usuario, 
      u.correo, 
      u.nombre, 
      u.apellido, 
      r.id_rol, 
      r.tipo_rol, 
      e.id_estacion, 
      e.nombre as nombre_estacion
     FROM USUARIO u
     JOIN ROL r ON u.id_rol = r.id_rol
     LEFT JOIN ESTACION e ON u.id_estacion = e.id_estacion
     WHERE u.id_usuario = ?`,
    [id]
  );
  return rows[0] || null;
};

const update = async (id, userData) => {
    const { correo, nombre, apellido, id_rol, id_estacion } = userData;
    
    // Nota: La contraseña no se actualiza aquí. Se maneja en un endpoint separado.
    const [result] = await pool.execute(
        'UPDATE USUARIO SET correo = ?, nombre = ?, apellido = ?, id_rol = ?, id_estacion = ? WHERE id_usuario = ?',
        [correo, nombre, apellido, id_rol, id_estacion || null, id]
    );
    return result.affectedRows;
};

const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM USUARIO WHERE id_usuario = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};