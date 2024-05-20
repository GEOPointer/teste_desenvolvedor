const express = require('express');
const cors = require('cors');  // Importa o pacote cors
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Conectar ao banco de dados
const sequelize = require('./database');
const Equipaments = require('./models/Equipaments');

sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

// Definir as rotas
const equipamentsRoutes = require('./routes/equipamentsRoute');
app.use('/equipaments', equipamentsRoutes);
