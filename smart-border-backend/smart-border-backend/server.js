const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const puenteRoutes = require('./routes/puente.routes');
const tiempoRoutes = require('./routes/tiempo.routes');
const prediccionRoutes = require('./routes/prediccion.routes');

// Usar rutas con prefijo /api
app.use('/api/puentes', puenteRoutes);
app.use('/api/tiempos', tiempoRoutes);
app.use('/api/predicciones', prediccionRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
