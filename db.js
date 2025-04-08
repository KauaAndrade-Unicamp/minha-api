require('dotenv').config(); // <= Carrega o .env
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Importante para o Neon
  }
});

module.exports = pool;