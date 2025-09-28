const { verifyToken } = require('../../utils/jwt.utils');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      message: 'No autorizado. No se proporcionó un token.',
    });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        message: 'No autorizado. El token no es válido o ha expirado.',
      });
    }

    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'No autorizado. Ocurrió un error al validar el token.',
    });
  }
};

module.exports = {
  protect,
};