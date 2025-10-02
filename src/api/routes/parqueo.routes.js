const express = require('express');
const parqueoController = require('../controllers/parqueo.controller');
const { protect }  = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/authorize');
const router = express.Router();

router.get('/', protect, authorize(1, 2), parqueoController.getAllParqueos);

module.exports = router;