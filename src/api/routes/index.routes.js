const express = require('express');
const authRoutes = require('./auth.routes');
const departamentoRoutes = require('./departamento.routes');
const pilotoRoutes = require('./piloto.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/pilotos', pilotoRoutes);

module.exports = router;