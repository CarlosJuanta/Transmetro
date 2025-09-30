const express = require('express');
const asignacionController = require('../controllers/asignacion_piloto.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1, 2), asignacionController.createAsignacion);
router.get('/', protect, authorize(1, 2), asignacionController.getAllAsignaciones);
router.get('/bus/:id_bus', protect, authorize(1, 2), asignacionController.getAsignacionesByBusId);
router.delete('/:id_asignacion', protect, authorize(1, 2), asignacionController.deleteAsignacion);

module.exports = router;