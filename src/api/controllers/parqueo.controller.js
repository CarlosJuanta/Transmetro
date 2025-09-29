const parqueoService = require('../services/parqueo.service');

const createParqueo = async (req, res) => {
  const { id_estacion } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  try {
    const nuevoParqueo = await parqueoService.create(nombre, id_estacion);
    res.status(201).json(nuevoParqueo);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La estación especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al crear el parqueo.' });
  }
};

const getParqueosByEstacionId = async (req, res) => {
  const { id_estacion } = req.params;
  try {
    const parqueos = await parqueoService.getByEstacionId(id_estacion);
    res.status(200).json(parqueos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los parqueos.' });
  }
};

const updateParqueo = async (req, res) => {
  const { id_parqueo } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  try {
    const affectedRows = await parqueoService.update(id_parqueo, nombre);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Parqueo no encontrado.' });
    }
    res.status(200).json({ id_parqueo, nombre });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el parqueo.' });
  }
};

const deleteParqueo = async (req, res) => {
  const { id_parqueo } = req.params;
  try {
    const affectedRows = await parqueoService.remove(id_parqueo);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Parqueo no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar el parqueo porque tiene buses asignados.' });
    }
    res.status(500).json({ message: 'Error al eliminar el parqueo.' });
  }
};

module.exports = {
  createParqueo,
  getParqueosByEstacionId,
  updateParqueo,
  deleteParqueo,
};