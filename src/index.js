const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const path = require('path');
const app = express();
require('dotenv').config();

const PASS = process.env.DATABASE_PASSWORD;

const rotasAutenticacao = require('./routers/autenticador.js');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'bdlocadora_ds'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', rotasAutenticacao);

app.use(rotasAutenticacao);

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})

app.get('/cadastro_clientes', rotasAutenticacao);

app.get('/cadastro_carros', rotasAutenticacao);

app.get('/cadastro_usuarios', rotasAutenticacao);

app.get('/cadastro_funcionarios', rotasAutenticacao);

app.get('/cadastro_ordemservico', rotasAutenticacao);

app.get('/busca_clientes', rotasAutenticacao);

app.get('/busca_carros', rotasAutenticacao);

app.get('/busca_usuarios', rotasAutenticacao);

app.get('/busca_funcionarios', rotasAutenticacao);

app.get('/busca_ordemservico', rotasAutenticacao);

app.get('/index.js', rotasAutenticacao);

app.get('/administrador', rotasAutenticacao);


