const { getConnection } = require('../db/connection');

async function getTiemposPorPuente(req, res) {
  const { id_puente } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id_puente', id_puente)
      .query('SELECT * FROM RegistroTiempo WHERE id_puente = @id_puente');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tiempos', error });
  }
}

module.exports = { getTiemposPorPuente };
