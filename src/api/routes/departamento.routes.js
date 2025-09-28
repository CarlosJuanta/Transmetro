const express = require('express');
const departamentoController = require('../controllers/departamento.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, departamentoController.getAllDepartamentos);
router.post('/', protect, departamentoController.createDepartamento);

module.exports = router;