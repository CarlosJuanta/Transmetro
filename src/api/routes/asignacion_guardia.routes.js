const express = require('express');
const asignacionController = require('../controllers/asignacion_guardia.controller');
const { protect }  = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1, 2), asignacionController.createAsignacion);
router.get('/', protect, authorize(1, 2), asignacionController.getAllAsignaciones);
router.get('/acceso/:id_acceso', protect, authorize(1, 2), asignacionController.getAsignacionesByAccesoId);
router.delete('/:id_asignacion', protect, authorize(1, 2), asignacionController.deleteAsignacion);

module.exports = router; 
