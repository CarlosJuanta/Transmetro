const express = require('express');
const estacionController = require('../controllers/estacion.controller');
const accesoController = require('../controllers/acceso.controller');
const parqueoController = require('../controllers/parqueo.controller'); // Importamos el nuevo controlador
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

// --- Rutas para la entidad ESTACION ---
router.post('/', protect, authorize(1), estacionController.createEstacion);
router.get('/', protect, authorize(1, 2),estacionController.getAllEstaciones);
router.get('/:id_estacion', protect, authorize(1, 2), estacionController.getEstacionById);
router.put('/:id_estacion', protect, authorize(1),estacionController.updateEstacion);
router.delete('/:id_estacion', protect, authorize(1), estacionController.deleteEstacion);

// --- Rutas anidadas para la entidad ACCESO ---
router.post('/:id_estacion/accesos', protect, authorize(1),accesoController.createAcceso);
router.get('/:id_estacion/accesos', protect, authorize(1, 2),accesoController.getAccesosByEstacionId);
router.put('/accesos/:id_acceso', protect, authorize(1), accesoController.updateAcceso);
router.delete('/accesos/:id_acceso', protect, authorize(1), accesoController.deleteAcceso);

// --- Rutas anidadas para la entidad PARQUEO ---
router.post('/:id_estacion/parqueos', protect, authorize(1), parqueoController.createParqueo);
router.get('/:id_estacion/parqueos', protect, authorize(1, 2),parqueoController.getParqueosByEstacionId);
router.put('/parqueos/:id_parqueo', protect, authorize(1),parqueoController.updateParqueo);
router.delete('/parqueos/:id_parqueo', protect, authorize(1), parqueoController.deleteParqueo);

module.exports = router;