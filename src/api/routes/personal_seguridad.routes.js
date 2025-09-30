const express = require('express');
const personalSeguridadController = require('../controllers/personal_seguridad.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1), personalSeguridadController.createPersonal);
router.get('/', protect, authorize(1, 2), personalSeguridadController.getAllPersonal);
router.get('/:id_personal', protect, authorize(1, 2), personalSeguridadController.getPersonalById);
router.put('/:id_personal', protect, authorize(1), personalSeguridadController.updatePersonal);
router.delete('/:id_personal', protect, authorize(1),  personalSeguridadController.deletePersonal);

module.exports = router;