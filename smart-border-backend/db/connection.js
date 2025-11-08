const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // ← usa el valor corregido con doble backslash
  database: process.env.DB_DATABASE,
  port: 1433, // ← ESTE ES EL QUE FALTABA
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  }
}

module.exports = { sql, getConnection };
