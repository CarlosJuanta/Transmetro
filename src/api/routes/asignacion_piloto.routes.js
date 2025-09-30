const express = require('express');
const asignacionController = require('../controllers/asignacion_piloto.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, asignacionController.createAsignacion);
router.get('/', protect, asignacionController.getAllAsignaciones);
router.get('/bus/:id_bus', protect, asignacionController.getAsignacionesByBusId);
router.delete('/:id_asignacion', protect, asignacionController.deleteAsignacion);

module.exports = router;