const express = require('express');
const router = express.Router();
const { getPuentes } = require('../controllers/puente.controller');

router.get('/', getPuentes);

module.exports = router;
