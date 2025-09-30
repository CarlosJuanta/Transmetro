const personalSeguridadService = require('../services/personal_seguridad.service');

const createPersonal = async (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ message: 'Los campos nombre, apellido y telefono son obligatorios.' });
  }

  try {
    const nuevoPersonal = await personalSeguridadService.create(nombre, apellido, telefono);
    res.status(201).json(nuevoPersonal);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el personal de seguridad.' });
  }
};

const getAllPersonal = async (req, res) => {
  try {
    const personal = await personalSeguridadService.getAll();
    res.status(200).json(personal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el personal de seguridad.' });
  }
};

const getPersonalById = async (req, res) => {
  const { id_personal } = req.params;
  try {
    const personal = await personalSeguridadService.getById(id_personal);
    if (!personal) {
      return res.status(404).json({ message: 'Personal de seguridad no encontrado.' });
    }
    res.status(200).json(personal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el personal de seguridad.' });
  }
};

const updatePersonal = async (req, res) => {
  const { id_personal } = req.params;
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).json({ message: 'Los campos nombre, apellido y telefono son obligatorios.' });
  }

  try {
    const affectedRows = await personalSeguridadService.update(id_personal, nombre, apellido, telefono);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Personal de seguridad no encontrado.' });
    }
    res.status(200).json({ id: parseInt(id_personal, 10), nombre, apellido, telefono });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el personal de seguridad.' });
  }
};

const deletePersonal = async (req, res) => {
  const { id_personal } = req.params;
  try {
    const affectedRows = await personalSeguridadService.remove(id_personal);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Personal de seguridad no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar el personal porque tiene turnos asignados.' });
    }
    res.status(500).json({ message: 'Error al eliminar el personal de seguridad.' });
  }
};

module.exports = {
  createPersonal,
  getAllPersonal,
  getPersonalById,
  updatePersonal,
  deletePersonal,
};