const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
  

const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'ya9osmv0j7fy0e08a0v9',
  password: 'pscale_pw_7fkcfiFe9hJsCOLCt4bm5J49jOo5AepNzR1UExChozF',
  database: 'barbearia',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

const tabelaNoBanco = 'agendamentos';

app.post('/salvar-no-banco', (req, res) => {
    const { nome, dataNasc, hora } = req.body;

    const sql = `INSERT INTO ${tabelaNoBanco} (nome, dataNasc, hora) VALUES (?, ?, ?)`;
    const values = [nome, dataNasc, hora];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            res.status(500).json({ success: false, error: 'Erro interno no servidor' });
            return;
        }

        console.log('Dados inseridos com sucesso:', results);
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/buscar-horarios', (req, res) => {
  const sql = `SELECT * FROM ${tabelaNoBanco}`;
  
  connection.query(sql, (error, results) => {
      if (error) {
          console.error('Erro ao buscar horários do banco de dados:', error);
          res.status(500).json({ error: 'Erro interno no servidor' });
          return;
      }

      console.log('Horários obtidos com sucesso:', results);
      res.json(results);
  });
});

app.delete('/remover-horario/:id', (req, res) => {
  const horarioId = req.params.id;

  const sql = `DELETE FROM ${tabelaNoBanco} WHERE id = ?`;

  connection.query(sql, [horarioId], (error, results) => {
      if (error) {
          console.error('Erro ao remover horário do banco de dados:', error);
          res.status(500).json({ error: 'Erro interno no servidor' });
          return;
      }

      console.log('Horário removido com sucesso:', results);
      res.json({ success: true });
  });
});


app.post('/marcar-como-concluido/:id', (req, res) => {
  const horarioId = req.params.id;

  const sqlMarcarComoConcluido = `DELETE FROM ${tabelaNoBanco} WHERE id = ?`;
  const valuesMarcarComoConcluido = [horarioId];

  connection.query(sqlMarcarComoConcluido, valuesMarcarComoConcluido, (error, results) => {
    if (error) {
      console.error('Erro ao marcar como concluído no banco de dados:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
      return;
    }

    console.log('Horário marcado como concluído com sucesso:', results);
    res.json({ success: true });
  });
});