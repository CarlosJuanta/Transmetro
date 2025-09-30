const express = require('express');
const operacionController = require('../controllers/operacion.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/llegada', protect, authorize(1, 2), operacionController.registrarLlegada);
router.patch('/registros/:id_registro/salida', protect, authorize(1, 2), operacionController.registrarSalida);

module.exports = router;