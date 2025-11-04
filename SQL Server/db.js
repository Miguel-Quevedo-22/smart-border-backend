const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'TU_CONTRASEÑA',
  server: 'localhost',
  database: 'SmartBorderQueue',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function conectar() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Puente`;
    console.log(result.recordset);
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}

conectar();
