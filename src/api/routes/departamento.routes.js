const express = require('express');
const departamentoController = require('../controllers/departamento.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.get('/', protect, authorize(1), departamentoController.getAllDepartamentos);
router.post('/', protect, authorize(1), departamentoController.createDepartamento);
router.put('/:id', protect, authorize(1), departamentoController.updateDepartamento);
router.delete('/:id', protect, authorize(1), departamentoController.deleteDepartamento);

module.exports = router;