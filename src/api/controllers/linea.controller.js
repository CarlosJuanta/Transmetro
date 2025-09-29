const lineaService = require('../services/linea.service');

const createLinea = async (req, res) => {
  const { nombre, id_municipalidad } = req.body;

  if (!nombre || !id_municipalidad) {
    return res.status(400).json({ message: 'El nombre y el id_municipalidad son obligatorios.' });
  }

  try {
    const nuevaLinea = await lineaService.create(nombre, id_municipalidad);
    res.status(201).json(nuevaLinea);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La municipalidad especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al crear la línea.' });
  }
};

const getAllLineas = async (req, res) => {
  try {
    const lineas = await lineaService.getAll();
    res.status(200).json(lineas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las líneas.' });
  }
};

const getLineaById = async (req, res) => {
  const { id_linea } = req.params;
  try {
    const linea = await lineaService.getById(id_linea);
    if (!linea) {
      return res.status(404).json({ message: 'Línea no encontrada.' });
    }
    res.status(200).json(linea);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la línea.' });
  }
};

const updateLinea = async (req, res) => {
  const { id_linea } = req.params;
  const { nombre, id_municipalidad } = req.body;

  if (!nombre || !id_municipalidad) {
    return res.status(400).json({ message: 'El nombre y el id_municipalidad son obligatorios.' });
  }

  try {
    const affectedRows = await lineaService.update(id_linea, nombre, id_municipalidad);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Línea no encontrada.' });
    }
    res.status(200).json({ id: parseInt(id_linea, 10), nombre, id_municipalidad });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La municipalidad especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al actualizar la línea.' });
  }
};

const deleteLinea = async (req, res) => {
  const { id_linea } = req.params;
  try {
    const affectedRows = await lineaService.remove(id_linea);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Línea no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar la línea porque tiene buses o rutas asociadas.' });
    }
    res.status(500).json({ message: 'Error al eliminar la línea.' });
  }
};

const updateRutaDeLinea = async (req, res) => {
  const { id_linea } = req.params;
  const { ruta } = req.body;

  if (!Array.isArray(ruta)) {
    return res.status(400).json({ message: 'El campo ruta debe ser un array de paradas.' });
  }

  try {
    await lineaService.updateRuta(id_linea, ruta);
    const lineaActualizada = await lineaService.getById(id_linea);
    res.status(200).json(lineaActualizada);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La ruta contiene una estación que no existe.' });
    }
    res.status(500).json({ message: 'Error al actualizar la ruta.' });
  }
};

module.exports = {
  createLinea,
  getAllLineas,
  getLineaById,
  updateLinea,
  deleteLinea,
  updateRutaDeLinea,
};