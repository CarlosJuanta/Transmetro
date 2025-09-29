const express = require('express');
const estacionController = require('../controllers/estacion.controller');
const accesoController = require('../controllers/acceso.controller');
const parqueoController = require('../controllers/parqueo.controller'); // Importamos el nuevo controlador
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// --- Rutas para la entidad ESTACION ---
router.post('/', protect, estacionController.createEstacion);
router.get('/', protect, estacionController.getAllEstaciones);
router.get('/:id_estacion', protect, estacionController.getEstacionById);
router.put('/:id_estacion', protect, estacionController.updateEstacion);
router.delete('/:id_estacion', protect, estacionController.deleteEstacion);

// --- Rutas anidadas para la entidad ACCESO ---
router.post('/:id_estacion/accesos', protect, accesoController.createAcceso);
router.get('/:id_estacion/accesos', protect, accesoController.getAccesosByEstacionId);
router.put('/accesos/:id_acceso', protect, accesoController.updateAcceso);
router.delete('/accesos/:id_acceso', protect, accesoController.deleteAcceso);

// --- Rutas anidadas para la entidad PARQUEO ---
router.post('/:id_estacion/parqueos', protect, parqueoController.createParqueo);
router.get('/:id_estacion/parqueos', protect, parqueoController.getParqueosByEstacionId);
router.put('/parqueos/:id_parqueo', protect, parqueoController.updateParqueo);
router.delete('/parqueos/:id_parqueo', protect, parqueoController.deleteParqueo);

module.exports = router;