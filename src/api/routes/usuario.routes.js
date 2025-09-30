const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, usuarioController.createUsuario);
router.get('/', protect, usuarioController.getAllUsuarios);
router.get('/:id_usuario', protect, usuarioController.getUsuarioById);
router.put('/:id_usuario', protect, usuarioController.updateUsuario);
router.delete('/:id_usuario', protect, usuarioController.deleteUsuario);

module.exports = router;