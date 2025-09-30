const express = require('express');
const rolController = require('../controllers/rol.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, rolController.createRol);
router.get('/', protect, rolController.getAllRoles);
router.get('/:id_rol', protect, rolController.getRolById);
router.put('/:id_rol', protect, rolController.updateRol);
router.delete('/:id_rol', protect, rolController.deleteRol);

module.exports = router;