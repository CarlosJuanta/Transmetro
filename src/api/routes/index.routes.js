const express = require('express');
const authRoutes = require('./auth.routes');
const departamentoRoutes = require('./departamento.routes');
const pilotoRoutes = require('./piloto.routes');
const municipalidadRoutes = require('./municipalidad.routes');
const estacionRoutes = require('./estacion.routes');
const lineaRoutes = require('./linea.routes');
const busRoutes = require('./bus.routes');
const operacionRoutes = require('./operacion.routes');
const rolRoutes = require('./rol.routes');
const usuarioRoutes = require('./usuario.routes'); 
const personalSeguridadRoutes = require('./personal_seguridad.routes');
const asignacionPilotoRoutes = require('./asignacion_piloto.routes'); 
const asignacionGuardiaRoutes = require('./asignacion_guardia.routes');
const reporteRoutes = require('./reporte.routes');
const parqueoRoutes = require('./parqueo.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departamentos', departamentoRoutes);
router.use('/pilotos', pilotoRoutes);
router.use('/municipalidades', municipalidadRoutes);
router.use('/estaciones', estacionRoutes);
router.use('/lineas', lineaRoutes);
router.use('/buses', busRoutes);
router.use('/operaciones', operacionRoutes);
router.use('/roles', rolRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/personal-seguridad', personalSeguridadRoutes); 
router.use('/asignaciones-pilotos', asignacionPilotoRoutes); 
router.use('/asignaciones-guardias', asignacionGuardiaRoutes);
router.use('/reportes', reporteRoutes);
router.use('/parqueos', parqueoRoutes);

module.exports = router;