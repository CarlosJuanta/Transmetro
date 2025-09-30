const express = require('express');
const rolController = require('../controllers/rol.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1), rolController.createRol);
router.get('/', protect, authorize(1), rolController.getAllRoles);
router.get('/:id_rol', protect, authorize(1), rolController.getRolById);
router.put('/:id_rol', protect, authorize(1), rolController.updateRol);
router.delete('/:id_rol', protect, authorize(1), rolController.deleteRol);

module.exports = router;