const express = require('express');
const asignacionController = require('../controllers/asignacion_guardia.controller');
const { protect }  = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, asignacionController.createAsignacion);
router.get('/', protect, asignacionController.getAllAsignaciones);
router.get('/acceso/:id_acceso', protect, asignacionController.getAsignacionesByAccesoId);
router.delete('/:id_asignacion', protect, asignacionController.deleteAsignacion);

module.exports = router; 
