const express = require('express');
const app = express();
const db = require('./db'); // importa o arquivo db.js
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo! 🌎');
});

// Nova rota que busca dados no banco
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT "URLImagemEvento" FROM "Evento" ORDER BY "DataEvento" DESC LIMIT 2');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
