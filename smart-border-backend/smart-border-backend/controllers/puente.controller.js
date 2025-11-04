const { getConnection, sql } = require('../db/connection');

async function getPuentes(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Puente');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los puentes', error });
  }
}

module.exports = { getPuentes };
