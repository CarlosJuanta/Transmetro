const express = require('express');
const pilotoController = require('../controllers/piloto.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, pilotoController.createPiloto);
router.get('/', protect, pilotoController.getAllPilotos);
router.get('/:id', protect, pilotoController.getPilotoById);
router.put('/:id', protect, pilotoController.updatePiloto);
router.delete('/:id', protect, pilotoController.deletePiloto);

module.exports = router;