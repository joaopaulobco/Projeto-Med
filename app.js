require("dotenv/config"); // permite acesso ao arquivo .env
const express = require("express");
const app = express();

const { isAuthenticated } = require("./middlewares/jwt.middleware");

// banco de dados
require("./db");

// configurações
require("./configs")(app);

// rotas
app.use("/auth", require("./routes/auth.routes"));
app.use("/anamnese", isAuthenticated, require("./routes/anamnese.routes"));

// erros
require("./error-handling")(app); // importamos e executamos a função já executando ela.

// exportar app
module.exports = app;
