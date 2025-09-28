const municipalidadService = require('../services/municipalidad.service');

const createMunicipalidad = async (req, res) => {
  const { nombre, id_departamento } = req.body;

  if (!nombre || !id_departamento) {
    return res.status(400).json({ message: 'El nombre y el id_departamento son obligatorios.' });
  }

  try {
    const nuevaMunicipalidad = await municipalidadService.create(nombre, id_departamento);
    res.status(201).json(nuevaMunicipalidad);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una municipalidad con ese nombre.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El departamento especificado no existe.' });
    }
    res.status(500).json({ message: 'Error al crear la municipalidad.', error: error.message });
  }
};

const getAllMunicipalidades = async (req, res) => {
  try {
    const municipalidades = await municipalidadService.getAll();
    res.status(200).json(municipalidades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las municipalidades.' });
  }
};

const getMunicipalidadById = async (req, res) => {
  const { id } = req.params;
  try {
    const municipalidad = await municipalidadService.getById(id);
    if (!municipalidad) {
      return res.status(404).json({ message: 'Municipalidad no encontrada.' });
    }
    res.status(200).json(municipalidad);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la municipalidad.' });
  }
};

const updateMunicipalidad = async (req, res) => {
  const { id } = req.params;
  const { nombre, id_departamento } = req.body;

  if (!nombre || !id_departamento) {
    return res.status(400).json({ message: 'El nombre y el id_departamento son obligatorios.' });
  }

  try {
    const affectedRows = await municipalidadService.update(id, nombre, id_departamento);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Municipalidad no encontrada.' });
    }
    res.status(200).json({ id, nombre, id_departamento });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una municipalidad con ese nombre.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El departamento especificado no existe.' });
    }
    res.status(500).json({ message: 'Error al actualizar la municipalidad.' });
  }
};

const deleteMunicipalidad = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await municipalidadService.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Municipalidad no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar la municipalidad porque tiene estaciones o líneas asociadas.' });
    }
    res.status(500).json({ message: 'Error al eliminar la municipalidad.' });
  }
};

module.exports = {
  createMunicipalidad,
  getAllMunicipalidades,
  getMunicipalidadById,
  updateMunicipalidad,
  deleteMunicipalidad,
};