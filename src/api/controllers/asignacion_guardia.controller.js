const asignacionGuardiaService = require('../services/asignacion_guardia.service');

const createAsignacion = async (req, res) => {
  const { id_personal, id_acceso, fecha_turno } = req.body;

  if (id_personal === undefined || id_acceso === undefined || !fecha_turno) {
    return res.status(400).json({ message: 'Los campos id_personal, id_acceso y fecha_turno son obligatorios.' });
  }

  try {
    const nuevaAsignacion = await asignacionGuardiaService.create(id_personal, id_acceso, fecha_turno);
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El personal de seguridad o el acceso especificado no existen.' });
    }
    res.status(500).json({ message: 'Error al crear la asignación.' });
  }
};

const getAllAsignaciones = async (req, res) => {
  try {
    const asignaciones = await asignacionGuardiaService.getAll();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaciones.' });
  }
};

const getAsignacionesByAccesoId = async (req, res) => {
    const { id_acceso } = req.params;
    try {
        const asignaciones = await asignacionGuardiaService.getByAccesoId(id_acceso);
        res.status(200).json(asignaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asignaciones del acceso.' });
    }
};

const deleteAsignacion = async (req, res) => {
  const { id_asignacion } = req.params;
  try {
    const affectedRows = await asignacionGuardiaService.remove(id_asignacion);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Asignación no encontrada.' });
    }
    res.status(204).send();
  } catch (error) {
    // NUEVO: Manejar el error de la regla de negocio
    if (error.code === 'BUSINESS_RULE_VIOLATION') {
        return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    res.status(500).json({ message: 'Error al eliminar la asignación.' });
  }
};

module.exports = {
  createAsignacion,
  getAllAsignaciones,
  getAsignacionesByAccesoId,
  deleteAsignacion,
};