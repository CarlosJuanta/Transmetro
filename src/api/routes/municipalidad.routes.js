const express = require('express');
const municipalidadController = require('../controllers/municipalidad.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1), municipalidadController.createMunicipalidad);
router.get('/', protect, authorize(1, 2),municipalidadController.getAllMunicipalidades);
router.get('/:id', protect, authorize(1, 2), municipalidadController.getMunicipalidadById);
router.put('/:id', protect,authorize(1), municipalidadController.updateMunicipalidad);
router.delete('/:id', protect,authorize(1), municipalidadController.deleteMunicipalidad);

module.exports = router;