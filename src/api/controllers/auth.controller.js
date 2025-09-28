const authService = require('../services/auth.service');
const { generateToken } = require('../../utils/jwt.utils');

const login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({
      message: 'El correo y la contraseña son obligatorios.',
    });
  }

  try {
    const usuario = await authService.login(correo, contrasenia);

    if (!usuario) {
      return res.status(401).json({
        message: 'Credenciales inválidas.',
      });
    }

    const payload = {
      id_usuario: usuario.id_usuario,
      id_rol: usuario.id_rol,
      id_estacion: usuario.id_estacion,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error interno del servidor al intentar iniciar sesión.',
      error: error.message,
    });
  }
};

module.exports = {
  login,
};