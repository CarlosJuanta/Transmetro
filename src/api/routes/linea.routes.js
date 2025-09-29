const express = require('express');
const lineaController = require('../controllers/linea.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// --- Rutas para la entidad LINEA (CRUD básico) ---
router.post('/', protect, lineaController.createLinea);
router.get('/', protect, lineaController.getAllLineas);
router.get('/:id_linea', protect, lineaController.getLineaById);
router.put('/:id_linea', protect, lineaController.updateLinea);
router.delete('/:id_linea', protect, lineaController.deleteLinea);

// --- Ruta para gestionar la RUTA de una línea ---
router.put('/:id_linea/ruta', protect, lineaController.updateRutaDeLinea);

module.exports = router;