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
  user: '9nrwjywwlo5ezqanbw4o',
  password: 'pscale_pw_c36VugINh7Oh7ukPCNlmMxQgXPUx04cUlDCFc1WNG98',
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
