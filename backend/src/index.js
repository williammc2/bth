const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

// Informa que voc"e vai utiliar o express.json para que sua aplicacao entenda as requisicoes
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(3333);

