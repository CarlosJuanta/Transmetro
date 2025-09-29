const express = require('express');
const authRoutes = require('./auth.routes');
const departamentoRoutes = require('./departamento.routes');
const pilotoRoutes = require('./piloto.routes');
const municipalidadRoutes = require('./municipalidad.routes');
const estacionRoutes = require('./estacion.routes');
const lineaRoutes = require('./linea.routes');
const busRoutes = require('./bus.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/pilotos', pilotoRoutes);
router.use('/municipalidades', municipalidadRoutes);
router.use('/estaciones', estacionRoutes);
router.use('/lineas', lineaRoutes);
router.use('/buses', busRoutes);

module.exports = router;