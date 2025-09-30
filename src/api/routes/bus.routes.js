const express = require('express');
const busController = require('../controllers/bus.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1),busController.createBus);
router.get('/', protect, authorize(1, 2),busController.getAllBuses);
router.get('/:id_bus', protect, authorize(1, 2), busController.getBusById);
router.put('/:id_bus', protect, authorize(1), busController.updateBus);
router.delete('/:id_bus', protect, authorize(1), busController.deleteBus);

module.exports = router;