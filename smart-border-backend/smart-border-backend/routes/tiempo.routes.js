const express = require('express');
const router = express.Router();
const { getTiemposPorPuente } = require('../controllers/tiempo.controller');

router.get('/:id_puente', getTiemposPorPuente);

module.exports = router;
