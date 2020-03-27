const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const routes = require('./routes');

const app = express();

// Informa que voc"e vai utiliar o express.json para que sua aplicacao entenda as requisicoes
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

//app.listen(3333);
module.exports = app;

