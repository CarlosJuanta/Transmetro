const usuarioService = require('../services/usuario.service');

const createUsuario = async (req, res) => {
  const userData = req.body;

  if (!userData.correo || !userData.contrasenia || !userData.nombre || !userData.apellido || !userData.id_rol) {
    return res.status(400).json({ message: 'Los campos correo, contrasenia, nombre, apellido y id_rol son obligatorios.' });
  }

  try {
    const nuevoUsuario = await usuarioService.create(userData);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un usuario con ese correo electrónico.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El rol o la estación especificados no existen.' });
    }
    res.status(500).json({ message: 'Error al crear el usuario.' });
  }
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};

const getUsuarioById = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await usuarioService.getById(id_usuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
};

const updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const userData = req.body;

  if (!userData.correo || !userData.nombre || !userData.apellido || !userData.id_rol) {
    return res.status(400).json({ message: 'Los campos correo, nombre, apellido y id_rol son obligatorios.' });
  }

  try {
    const affectedRows = await usuarioService.update(id_usuario, userData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    const usuarioActualizado = await usuarioService.getById(id_usuario);
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un usuario con ese correo electrónico.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El rol o la estación especificados no existen.' });
    }
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const affectedRows = await usuarioService.remove(id_usuario);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};

module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};