const operacionService = require('../services/operacion.service');

const registrarLlegada = async (req, res) => {
  const { id_bus, id_estacion, pasajeros_registrados } = req.body;

  if (id_bus === undefined || id_estacion === undefined || pasajeros_registrados === undefined) {
    return res.status(400).json({ message: 'Los campos id_bus, id_estacion y pasajeros_registrados son obligatorios.' });
  }

  try {
    const resultado = await operacionService.registrarLlegada(id_bus, id_estacion, pasajeros_registrados);
    
    // El frontend recibirá este objeto y sabrá si debe tomar una acción especial
    res.status(201).json(resultado);
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'El bus o la estación especificados no existen.' });
    }
    res.status(500).json({ message: 'Error al registrar la llegada.', error: error.message });
  }
};

const registrarSalida = async (req, res) => {
    const { id_registro } = req.params;

    try {
        const affectedRows = await operacionService.registrarSalida(id_registro);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de operación no encontrado.' });
        }
        res.status(200).json({ message: 'Salida registrada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la salida.', error: error.message });
    }
};


module.exports = {
  registrarLlegada,
  registrarSalida
};