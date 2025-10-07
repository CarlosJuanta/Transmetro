const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.post('/', protect, authorize(1), usuarioController.createUsuario);
router.get('/', protect, authorize(1), usuarioController.getAllUsuarios);
router.get('/:id_usuario', protect, authorize(1), usuarioController.getUsuarioById);
router.put('/:id_usuario', protect, authorize(1), usuarioController.updateUsuario);
router.put('/:id_usuario/reset-password', protect, authorize(1), usuarioController.resetPassword);
router.delete('/:id_usuario', protect, authorize(1), usuarioController.deleteUsuario);

module.exports = router;