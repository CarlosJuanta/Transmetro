const express = require('express');
const lineaController = require('../controllers/linea.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();


router.post('/', protect, authorize(1), lineaController.createLinea);
router.get('/', protect, authorize(1, 2), lineaController.getAllLineas);
router.get('/:id_linea', protect, authorize(1, 2), lineaController.getLineaById);
router.put('/:id_linea', protect, authorize(1), lineaController.updateLinea);
router.delete('/:id_linea', protect, authorize(1), lineaController.deleteLinea);

router.put('/:id_linea/ruta', protect, authorize(1), lineaController.updateRutaDeLinea);

module.exports = router;