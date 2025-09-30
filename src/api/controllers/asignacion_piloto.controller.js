const asignacionPilotoService = require('../services/asignacion_piloto.service');

const createAsignacion = async (req, res) => {
  const { id_piloto, id_bus, fecha_turno } = req.body;

  if (id_piloto === undefined || id_bus === undefined || !fecha_turno) {
    return res.status(400).json({ message: 'Los campos id_piloto, id_bus y fecha_turno son obligatorios.' });
  }

  try {
    const nuevaAsignacion = await asignacionPilotoService.create(id_piloto, id_bus, fecha_turno);
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El piloto o el bus especificado no existen.' });
    }
    res.status(500).json({ message: 'Error al crear la asignación.' });
  }
};

const getAllAsignaciones = async (req, res) => {
  try {
    const asignaciones = await asignacionPilotoService.getAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaciones.' });
  }
};

const getAsignacionesByBusId = async (req, res) => {
    const { id_bus } = req.params;
    try {
        const asignaciones = await asignacionPilotoService.getByBusId(id_bus);
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asignaciones del bus.' });
    }
};

const deleteAsignacion = async (req, res) => {
  const { id_asignacion } = req.params;
  try {
    const affectedRows = await asignacionPilotoService.remove(id_asignacion);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Asignación no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la asignación.' });
  }
};

module.exports = {
  createAsignacion,
  getAllAsignaciones,
  getAsignacionesByBusId,
  deleteAsignacion,
};