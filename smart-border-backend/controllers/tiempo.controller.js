const { getConnection, sql } = require('../db/connection');

// Obtener tiempos por puente
async function getTiemposPorPuente(req, res) {
  const { id_puente } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id_puente', sql.Int, id_puente)
      .query('SELECT * FROM RegistroTiempo WHERE id_puente = @id_puente');
    
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tiempos', error });
  }
}

// Filtro avanzado (Opción B)
async function filtrarTiempos(req, res) {
  const { id_puente, fecha, tipo } = req.query;

  try {
    const pool = await getConnection();
    let query = `
      SELECT R.id_registro, R.id_puente, P.nombre_puente, R.fecha_registro, 
             R.tiempo_espera_min, R.tipo_dato, P.tipo_trafico
      FROM RegistroTiempo R
      INNER JOIN Puente P ON R.id_puente = P.id_puente
      WHERE 1=1
    `;

    if (id_puente) query += ` AND R.id_puente = ${id_puente}`;
    if (fecha) query += ` AND CAST(R.fecha_registro AS DATE) = '${fecha}'`;
    if (tipo) query += ` AND P.tipo_trafico = '${tipo}'`;

    const result = await pool.request().query(query);
    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar datos', error });
  }
}

// Agregar tiempo manual (Módulo 20.4)
async function agregarTiempo(req, res) {
  const { id_puente, tiempo_espera_min, tipo_dato } = req.body;

  try {
    const pool = await getConnection();

    const insertTiempo = await pool.request()
      .input('id_puente', sql.Int, id_puente)
      .input('tiempo_espera_min', sql.Int, tiempo_espera_min)
      .input('tipo_dato', tipo_dato)
      .query(`
        INSERT INTO RegistroTiempo (id_puente, tiempo_espera_min, tipo_dato)
        VALUES (@id_puente, @tiempo_espera_min, @tipo_dato);
        SELECT SCOPE_IDENTITY() AS id_registro;
      `);

    const id_registro = insertTiempo.recordset[0].id_registro;

    await pool.request()
      .input('id_registro', sql.Int, id_registro)
      .input('tipo_actualizacion', 'Manual')
      .input('descripcion', 'Carga manual realizada desde el sistema.')
      .query(`
        INSERT INTO LogActualizacion (id_registro, tipo_actualizacion, descripcion)
        VALUES (@id_registro, @tipo_actualizacion, @descripcion);
      `);

    res.json({ message: '✅ Registro agregado con éxito', id_registro });

  } catch (error) {
    res.status(500).json({ message: '❌ Error al agregar tiempo', error });
  }
}

module.exports = { 
  getTiemposPorPuente,
  filtrarTiempos,
  agregarTiempo
};
