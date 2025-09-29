const estacionService = require('../services/estacion.service');

const createEstacion = async (req, res) => {
  const { nombre, id_municipalidad } = req.body;

  if (!nombre || !id_municipalidad) {
    return res.status(400).json({ message: 'El nombre y el id_municipalidad son obligatorios.' });
  }

  try {
    const nuevaEstacion = await estacionService.create(nombre, id_municipalidad);
    res.status(201).json(nuevaEstacion);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La municipalidad especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al crear la estación.', error: error.message });
  }
};

const getAllEstaciones = async (req, res) => {
  try {
    const estaciones = await estacionService.getAll();
    res.status(200).json(estaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las estaciones.' });
  }
};

const getEstacionById = async (req, res) => {
  const { id_estacion } = req.params;
  try {
    const estacion = await estacionService.getById(id_estacion);
    if (!estacion) {
      return res.status(404).json({ message: 'Estación no encontrada.' });
    }
    res.status(200).json(estacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la estación.' });
  }
};

const updateEstacion = async (req, res) => {
  const { id_estacion } = req.params;
  const { nombre, id_municipalidad } = req.body;

  if (!nombre || !id_municipalidad) {
    return res.status(400).json({ message: 'El nombre y el id_municipalidad son obligatorios.' });
  }

  try {
    const affectedRows = await estacionService.update(id_estacion, nombre, id_municipalidad);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Estación no encontrada.' });
    }
    res.status(200).json({ id: parseInt(id_estacion, 10), nombre, id_municipalidad });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La municipalidad especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al actualizar la estación.' });
  }
};

const deleteEstacion = async (req, res) => {
  const { id_estacion } = req.params;
  try {
    const affectedRows = await estacionService.remove(id_estacion);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Estación no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar la estación porque tiene accesos, parqueos o rutas asociadas.' });
    }
    res.status(500).json({ message: 'Error al eliminar la estación.' });
  }
};

module.exports = {
  createEstacion,
  getAllEstaciones,
  getEstacionById,
  updateEstacion,
  deleteEstacion,
};