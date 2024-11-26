const express = require('express');
const router = express.Router();

const controller = require('../controllers/autenticadorController'); 
const clientescrud = require('../controllers/clientescrud');
const userscrud = require('../controllers/usuarioscrud');
const veiccrud = require('../controllers/veiculoscrud');
const paginascrud = require('../controllers/paginascrud');
const funccrud = require('../controllers/funcionarioscrud');
const ordemcrud = require('../controllers/ordemcrud');

//autenticação do user
router.post('/login', controller.login); 

//rotas de renderização
router.get('/index', paginascrud.paginaindex);

router.get('/cadastro_clientes', paginascrud.cadastroCli);

router.get('/cadastro_carros', paginascrud.cadastroVeic);

router.get('/cadastro_funcionarios', paginascrud.cadastroFunc);

router.get('/cadastro_usuarios', paginascrud.cadastroUser);

router.get('/administrador', paginascrud.adm);


//rotas de cliente
router.get('/busca_clientes', clientescrud.list);

router.post('/clientes/add', clientescrud.save);

router.get('/clientes/delete/:cpf', clientescrud.delete);

router.get('/clientes/edit/:clienteCPF', clientescrud.edit);

router.post('/clientes/update/:cpf', clientescrud.update);

//rotas de usuário
router.get('/busca_usuarios', userscrud.list);

router.post('/usuarios/add', userscrud.save);

router.get('/usuarios/delete/:senha', userscrud.delete);

router.get('/usuarios/edit/:senha', userscrud.edit);

router.post('/usuarios/update/:senha', userscrud.update)

//rotas de veículo
router.get('/busca_carros', veiccrud.list);

router.post('/veiculos/add', veiccrud.save);

router.get('/veiculos/delete/:placa', veiccrud.delete);

router.get('/veiculos/edit/:veicPlaca', veiccrud.edit);

router.post('/veiculos/update/:placa', veiccrud.update);

//rotas de funcionario
router.get('/busca_funcionarios', funccrud.list);

router.post('/funcionarios/add', funccrud.save);

router.get('/funcionarios/delete/:matricula', funccrud.delete);

router.post('/funcionarios/update/:matricula', funccrud.update);

router.get('/funcionarios/edit/:matricula', funccrud.edit);


//rotas de ordem de serviço
router.get('/busca_ordemservico', ordemcrud.list);

router.post('/ordem/add', ordemcrud.save);

router.get('/ordem/delete/:numero', ordemcrud.delete);

router.post('/ordem/update/:numero', ordemcrud.update);

router.get('/ordem/edit/:numero', ordemcrud.edit);

router.get('/cadastro_ordemservico', ordemcrud.cadastro);

module.exports = router;