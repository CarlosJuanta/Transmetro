const express = require('express');
const busController = require('../controllers/bus.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, busController.createBus);
router.get('/', protect, busController.getAllBuses);
router.get('/:id_bus', protect, busController.getBusById);
router.put('/:id_bus', protect, busController.updateBus);
router.delete('/:id_bus', protect, busController.deleteBus);

module.exports = router;