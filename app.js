require('dotenv/config'); // permite acesso ao arquivo .env
const express = require('express');
const app = express();

const { isAuthenticated } = require('./middlewares/jwt.middleware');
const isDoctor = require('./middlewares/doctor.middleware')

// banco de dados
require('./db');
// configurações
require('./configs')(app);
// rotas
app.use('/auth', require('./routes/auth.routes'));
app.use('/doctors',isAuthenticated, require('./routes/doctor.routes'))
// erros

app.use((req, res, next) => {
  res.status(404).json('Não encontrado!');
});


require('./error-handling')(app); // importamos e executamos a função já executando ela.

// exportar app
module.exports = app;