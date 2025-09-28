const express = require('express');
const municipalidadController = require('../controllers/municipalidad.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, municipalidadController.createMunicipalidad);
router.get('/', protect, municipalidadController.getAllMunicipalidades);
router.get('/:id', protect, municipalidadController.getMunicipalidadById);
router.put('/:id', protect, municipalidadController.updateMunicipalidad);
router.delete('/:id', protect, municipalidadController.deleteMunicipalidad);

module.exports = router;