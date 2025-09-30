const rolService = require('../services/rol.service');

const createRol = async (req, res) => {
  const { tipo_rol } = req.body;

  if (!tipo_rol) {
    return res.status(400).json({ message: 'El campo tipo_rol es obligatorio.' });
  }

  try {
    const nuevoRol = await rolService.create(tipo_rol);
    res.status(201).json(nuevoRol);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un rol con ese nombre.' });
    }
    res.status(500).json({ message: 'Error al crear el rol.' });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await rolService.getAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los roles.' });
  }
};

const getRolById = async (req, res) => {
  const { id_rol } = req.params;
  try {
    const rol = await rolService.getById(id_rol);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol.' });
  }
};

const updateRol = async (req, res) => {
  const { id_rol } = req.params;
  const { tipo_rol } = req.body;

  if (!tipo_rol) {
    return res.status(400).json({ message: 'El campo tipo_rol es obligatorio.' });
  }

  try {
    const affectedRows = await rolService.update(id_rol, tipo_rol);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    res.status(200).json({ id: parseInt(id_rol, 10), tipo_rol });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un rol con ese nombre.' });
    }
    res.status(500).json({ message: 'Error al actualizar el rol.' });
  }
};

const deleteRol = async (req, res) => {
  const { id_rol } = req.params;
  try {
    const affectedRows = await rolService.remove(id_rol);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar el rol porque tiene usuarios asignados.' });
    }
    res.status(500).json({ message: 'Error al eliminar el rol.' });
  }
};

module.exports = {
  createRol,
  getAllRoles,
  getRolById,
  updateRol,
  deleteRol,
};