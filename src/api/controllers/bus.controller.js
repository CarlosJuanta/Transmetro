const busService = require('../services/bus.service');

const createBus = async (req, res) => {
  let { placa, capacidad_maxima, id_linea, id_parqueo } = req.body;

  if (!placa || !capacidad_maxima || !id_parqueo) {
    return res.status(400).json({ message: 'Los campos placa, capacidad_maxima y id_parqueo son obligatorios.' });
  }

 
  if (id_linea === undefined || id_linea === '') {
    id_linea = null;
  }

  try {
    const nuevoBus = await busService.create(placa, capacidad_maxima, id_linea, id_parqueo);
    res.status(201).json(nuevoBus);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un bus con esa placa.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La línea o el parqueo especificado no existen.' });
    }
    res.status(500).json({ message: 'Error al crear el bus.', error: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await busService.getAll();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los buses.' });
  }
};

const getBusById = async (req, res) => {
  const { id_bus } = req.params;
  try {
    const bus = await busService.getById(id_bus);
    if (!bus) {
      return res.status(404).json({ message: 'Bus no encontrado.' });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el bus.' });
  }
};

const updateBus = async (req, res) => {
  const { id_bus } = req.params;
  let { placa, capacidad_maxima, id_linea, id_parqueo } = req.body;

  if (!placa || capacidad_maxima === undefined || id_parqueo === undefined) {
    return res.status(400).json({ message: 'Los campos placa, capacidad_maxima y id_parqueo son obligatorios.' });
  }
  
  if (id_linea === undefined || id_linea === '') {
    id_linea = null;
  }

  try {
    const affectedRows = await busService.update(id_bus, placa, capacidad_maxima, id_linea, id_parqueo);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Bus no encontrado.' });
    }
    res.status(200).json({ id: parseInt(id_bus, 10), placa, capacidad_maxima, id_linea, id_parqueo });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un bus con esa placa.' });
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'La línea o el parqueo especificado no existen.' });
    }
    res.status(500).json({ message: 'Error al actualizar el bus.', error: error.message });
  }
};

const deleteBus = async (req, res) => {
  const { id_bus } = req.params;
  try {
    const affectedRows = await busService.remove(id_bus);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Bus no encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ message: 'No se puede eliminar el bus porque tiene pilotos o registros de operación asociados.' });
    }
    res.status(500).json({ message: 'Error al eliminar el bus.' });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};