const accesoService = require('../services/acceso.service');

const createAcceso = async (req, res) => {
  const { id_estacion } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  try {
    const nuevoAcceso = await accesoService.create(nombre, id_estacion);
    res.status(201).json(nuevoAcceso);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La estación especificada no existe.' });
    }
    res.status(500).json({ message: 'Error al crear el acceso.' });
  }
};

const getAccesosByEstacionId = async (req, res) => {
  const { id_estacion } = req.params;
  try {
    const accesos = await accesoService.getByEstacionId(id_estacion);
    res.status(200).json(accesos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los accesos.' });
  }
};

const updateAcceso = async (req, res) => {
  const { id_acceso } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  try {
    const affectedRows = await accesoService.update(id_acceso, nombre);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Acceso no encontrado.' });
    }
    res.status(200).json({ id_acceso, nombre });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el acceso.' });
  }
};

const deleteAcceso = async (req, res) => {
  const { id_acceso } = req.params;
  try {
    const affectedRows = await accesoService.remove(id_acceso);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Acceso no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar el acceso porque tiene guardias asignados.' });
    }
    res.status(500).json({ message: 'Error al eliminar el acceso.' });
  }
};

module.exports = {
  createAcceso,
  getAccesosByEstacionId,
  updateAcceso,
  deleteAcceso,
};