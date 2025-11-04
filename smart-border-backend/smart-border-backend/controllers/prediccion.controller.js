const { getConnection } = require('../db/connection');

async function getPrediccionesPorPuente(req, res) {
  const { id_puente } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id_puente', id_puente)
      .query(`
        SELECT P.id_prediccion, R.id_puente, R.fecha_registro, 
               P.tiempo_estimado_min, P.modelo_utilizado, P.margen_error
        FROM PrediccionTiempo P
        INNER JOIN RegistroTiempo R ON P.id_registro = R.id_registro
        WHERE R.id_puente = @id_puente
      `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener predicciones', error });
  }
}

module.exports = { getPrediccionesPorPuente };
