const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(Number(req.user.id_rol))) {
      return res.status(403).json({ message: 'Acceso prohibido. No tienes los permisos necesarios para realizar esta acción.' });
    }
    next();
  };
};

module.exports = { authorize };