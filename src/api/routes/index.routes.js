const express = require('express');
const authRoutes = require('./auth.routes');
const departamentoRoutes = require('./departamento.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departamentos', departamentoRoutes);

module.exports = router;