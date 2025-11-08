const express = require('express');
const router = express.Router();
const { getTiemposPorPuente, filtrarTiempos, agregarTiempo } = require('../controllers/tiempo.controller');

router.post('/agregar', agregarTiempo);
router.get('/filtro', filtrarTiempos);
router.get('/:id_puente', getTiemposPorPuente);

module.exports = router;
