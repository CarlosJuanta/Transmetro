const express = require('express');
const operacionController = require('../controllers/operacion.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/llegada', protect, operacionController.registrarLlegada);
router.patch('/registros/:id_registro/salida', protect, operacionController.registrarSalida);

module.exports = router;