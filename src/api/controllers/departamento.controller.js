const departamentoService = require('../services/departamento.service');

const getAllDepartamentos = async (req, res) => {
  try {
    const departamentos = await departamentoService.getAll();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los departamentos.' });
  }
};

const createDepartamento = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
  }

  try {
    const nuevoDepartamento = await departamentoService.create(nombre);
    res.status(201).json(nuevoDepartamento);
  } catch (error) {
    // Manejo de error para nombre duplicado
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un departamento con ese nombre.' });
    }
    res.status(500).json({ message: 'Error al crear el departamento.' });
  }
};

module.exports = {
  getAllDepartamentos,
  createDepartamento,
};