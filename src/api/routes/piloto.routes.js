const express = require('express');
const pilotoController = require('../controllers/piloto.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1), pilotoController.createPiloto);
router.get('/', protect,authorize(1, 2), pilotoController.getAllPilotos);
router.get('/:id', protect, authorize(1, 2), pilotoController.getPilotoById);
router.put('/:id', protect, authorize(1), pilotoController.updatePiloto);
router.delete('/:id', protect, authorize(1), pilotoController.deletePiloto);

module.exports = router;