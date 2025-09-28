const pool = require('../../config/db');
const { comparePassword } = require('../../utils/password.utils');

const login = async (correo, contrasenia) => {
  const [rows] = await pool.execute(
    'SELECT id_usuario, correo, contrasenia, nombre, apellido, id_rol, id_estacion FROM USUARIO WHERE correo = ?',
    [correo]
  );

  if (rows.length === 0) {
    return null;
  }

  const usuario = rows[0];

  const isMatch = await comparePassword(contrasenia, usuario.contrasenia);

  if (!isMatch) {
    return null;
  }

  const { contrasenia: _, ...usuarioSinContrasenia } = usuario;
  return usuarioSinContrasenia;
};

module.exports = {
  login,
};