const express = require('express');
const personalSeguridadController = require('../controllers/personal_seguridad.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, personalSeguridadController.createPersonal);
router.get('/', protect, personalSeguridadController.getAllPersonal);
router.get('/:id_personal', protect, personalSeguridadController.getPersonalById);
router.put('/:id_personal', protect, personalSeguridadController.updatePersonal);
router.delete('/:id_personal', protect, personalSeguridadController.deletePersonal);

module.exports = router;