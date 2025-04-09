const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const db = require('./db'); // importa o arquivo db.js
const port = 3000;

app.use(cors()); // Permite CORS para qualquer origem
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo! 🌎');
});

// Nova rota que busca dados no banco
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT "URLImagemEvento", "TituloSiteEvento", "DescricaoSiteEvento", "DataEvento"
      FROM "Evento"
      WHERE "DataEvento" >= NOW()
      ORDER BY "DataEvento" ASC
      LIMIT 2
    `);
    res.json(result.rows.reverse()); // Inverte a ordem para que [0] seja a segunda mais próxima e [1] a mais próxima
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
