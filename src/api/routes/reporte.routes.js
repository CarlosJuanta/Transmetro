const express = require('express');
const reporteController = require('../controllers/reporte.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// 1. Reporte de Estaciones (Cumple Requisito #15)
router.get('/estaciones', protect, reporteController.generarReporteEstaciones);

// 2. Reporte General de Líneas y Buses Asignados
router.get('/lineas-buses', protect, reporteController.getReporteGeneralLineasBuses);

// 3. Reporte de Distancia Total de una Línea
router.get('/lineas/:id_linea/distancia', protect, reporteController.getReporteDistanciaLinea);

// 4. Reporte de Accesos por Línea
router.get('/lineas/:id_linea/accesos', protect, reporteController.getReporteAccesosPorLinea);

module.exports = router;