const express = require('express');
const reporteController = require('../controllers/reporte.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.get('/estaciones', protect, authorize(1, 2), reporteController.generarReporteEstaciones);
router.get('/lineas-buses', protect, authorize(1, 2),  reporteController.getReporteGeneralLineasBuses);
router.get('/lineas/:id_linea/distancia', protect, authorize(1, 2),  reporteController.getReporteDistanciaLinea);
router.get('/lineas/:id_linea/accesos', protect, authorize(1, 2),  reporteController.getReporteAccesosPorLinea);
router.get('/lineas-estaciones', protect, authorize(1, 2), reporteController.getReporteGeneralLineasEstaciones);
router.get('/estado-lineas', protect, authorize(1), reporteController.getReporteEstadoLineas);

module.exports = router;