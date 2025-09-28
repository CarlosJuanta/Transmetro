const pilotoService = require('../services/piloto.service');

const createPiloto = async (req, res) => {
  const pilotoData = req.body;

  // Validación básica de campos obligatorios
  if (!pilotoData.nombre || !pilotoData.apellido || !pilotoData.dpi || !pilotoData.fecha_nacimiento || !pilotoData.direccion_residencia || !pilotoData.telefono_celular) {
    return res.status(400).json({ message: 'Todos los campos personales del piloto son obligatorios.' });
  }

  try {
    const nuevoPiloto = await pilotoService.create(pilotoData);
    res.status(201).json(nuevoPiloto);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El DPI ingresado ya está registrado.' });
    }
    res.status(500).json({ message: 'Error al crear el piloto.', error: error.message });
  }
};

const getAllPilotos = async (req, res) => {
  try {
    const pilotos = await pilotoService.getAll();
    res.status(200).json(pilotos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pilotos.' });
  }
};

const getPilotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const piloto = await pilotoService.getById(id);
    if (!piloto) {
      return res.status(404).json({ message: 'Piloto no encontrado.' });
    }
    res.status(200).json(piloto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el piloto.' });
  }
}; 


const updatePiloto = async (req, res) => {
  const { id } = req.params;
  const pilotoData = req.body;

  try {
    const affectedRows = await pilotoService.update(id, pilotoData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Piloto no encontrado.' });
    }
    res.status(200).json({ id, ...pilotoData });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El DPI ingresado ya está registrado para otro piloto.' });
    }
    res.status(500).json({ message: 'Error al actualizar el piloto.', error: error.message });
  }
};

const deletePiloto = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await pilotoService.remove(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Piloto no encontrado.' });
    }
    res.status(204).send(); // 204 No Content: éxito, pero no se devuelve nada
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el piloto.' });
  }
};

module.exports = {
  createPiloto,
  getAllPilotos,
  getPilotoById,
  updatePiloto,
  deletePiloto,
};