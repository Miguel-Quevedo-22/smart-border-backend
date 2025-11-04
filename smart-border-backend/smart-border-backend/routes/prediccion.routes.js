const express = require('express');
const router = express.Router();
const { getPrediccionesPorPuente } = require('../controllers/prediccion.controller');

router.get('/:id_puente', getPrediccionesPorPuente);

module.exports = router;
