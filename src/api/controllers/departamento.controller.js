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
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe un departamento con ese nombre.' });
    }
    res.status(500).json({ message: 'Error al crear el departamento.' });
  }
};

const updateDepartamento = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El campo nombre es obligatorio.' });
    }
    try {
      const affectedRows = await departamentoService.update(id, nombre);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Departamento no encontrado.' });
      }
      res.status(200).json({ id: parseInt(id, 10), nombre });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Ya existe un departamento con ese nombre.' });
      }
      res.status(500).json({ message: 'Error al actualizar el departamento.' });
    }
};

const deleteDepartamento = async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await departamentoService.remove(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Departamento no encontrado.' });
      }
      res.status(204).send();
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ message: 'No se puede eliminar el departamento porque tiene municipalidades asociadas.' });
      }
      res.status(500).json({ message: 'Error al eliminar el departamento.' });
    }
};

module.exports = {
  getAllDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento
};