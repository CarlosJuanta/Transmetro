const express = require('express');
const reporteController = require('../controllers/reporte.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

// 1. Reporte de Estaciones (Cumple Requisito #15)
router.get('/estaciones', protect, authorize(1, 2), reporteController.generarReporteEstaciones);

// 2. Reporte General de Líneas y Buses Asignados
router.get('/lineas-buses', protect, authorize(1, 2),  reporteController.getReporteGeneralLineasBuses);

// 3. Reporte de Distancia Total de una Línea
router.get('/lineas/:id_linea/distancia', protect, authorize(1, 2),  reporteController.getReporteDistanciaLinea);

// 4. Reporte de Accesos por Línea
router.get('/lineas/:id_linea/accesos', protect, authorize(1, 2),  reporteController.getReporteAccesosPorLinea);

module.exports = router;