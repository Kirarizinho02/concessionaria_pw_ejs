const express = require('express');
const router = express.Router();

const dptoPermitido = require('../middlewares/middlewareAutenticador') //Aqui dá pra ver a função que a gente importou do Middleware em cena 

const auth = require('../controllers/autenticadorController'); 
const clientescrud = require('../controllers/clientescrud');
const userscrud = require('../controllers/usuarioscrud');
const veiccrud = require('../controllers/veiculoscrud');
const paginascrud = require('../controllers/paginascrud');
const funccrud = require('../controllers/funcionarioscrud');
const ordemcrud = require('../controllers/ordemcrud');

//autenticação do user
router.post('/login', auth.login); 

//rotas de renderização
router.get('/index', paginascrud.paginaindex);

router.get('/cadastro_clientes', dptoPermitido(1, 2, 3, 4), paginascrud.cadastroCli); //Ele passa como parâmetro pro allowed deptos esses valores

router.get('/cadastro_carros', dptoPermitido(2, 3, 4), paginascrud.cadastroVeic); //Se o valor do depto da sessão do seu usuário for diferente de um desses

router.get('/cadastro_funcionarios', dptoPermitido(2, 3, 4), paginascrud.cadastroFunc); //Você não tem acesso a rota

router.get('/cadastro_usuarios', dptoPermitido(4), paginascrud.cadastroUser);

router.get('/administrador', dptoPermitido(1, 2, 3, 4, 5), paginascrud.adm);


//rotas de cliente
router.get('/busca_clientes', dptoPermitido(1, 2, 3, 4, 5), clientescrud.list);

router.post('/clientes/add', dptoPermitido(1, 2, 3, 4), clientescrud.save);

router.get('/clientes/delete/:cpf', dptoPermitido(2, 3, 4), clientescrud.delete);

router.get('/clientes/edit/:clienteCPF', dptoPermitido(1, 2, 3, 4), clientescrud.edit);

router.post('/clientes/update/:cpf', dptoPermitido(1, 2, 3, 4), clientescrud.update);

//rotas de usuário
router.get('/busca_usuarios', dptoPermitido(4), userscrud.list);

router.post('/usuarios/add', dptoPermitido(4), userscrud.save);

router.get('/usuarios/delete/:senha', dptoPermitido(4), userscrud.delete);

router.get('/usuarios/edit/:senha', dptoPermitido(4), userscrud.edit);

router.post('/usuarios/update/:senha', dptoPermitido(4), userscrud.update)

//rotas de veículo
router.get('/busca_carros', dptoPermitido(2, 3, 4, 5), veiccrud.list);

router.post('/veiculos/add', dptoPermitido(2, 3, 4), veiccrud.save);

router.get('/veiculos/delete/:placa', dptoPermitido(2, 3, 4), veiccrud.delete);

router.get('/veiculos/edit/:veicPlaca', dptoPermitido(2, 3, 4), veiccrud.edit);

router.post('/veiculos/update/:placa', dptoPermitido(2, 3, 4), veiccrud.update);

//rotas de funcionario
router.get('/busca_funcionarios', dptoPermitido(2, 3, 4, 5), funccrud.list);

router.post('/funcionarios/add', dptoPermitido(2, 3, 4), funccrud.save);

router.get('/funcionarios/delete/:matricula', dptoPermitido(2, 3, 4), funccrud.delete);

router.post('/funcionarios/update/:matricula', dptoPermitido(2, 3, 4), funccrud.update);

router.get('/funcionarios/edit/:matricula', dptoPermitido(2, 3, 4), funccrud.edit);


//rotas de ordem de serviço
router.get('/busca_ordemservico', dptoPermitido(1, 4), ordemcrud.list);

router.post('/ordem/add', dptoPermitido(1, 4), ordemcrud.save);

router.get('/ordem/delete/:numero', dptoPermitido(4), ordemcrud.delete);

router.post('/ordem/update/:numero', dptoPermitido(1, 4), ordemcrud.update);

router.get('/ordem/edit/:numero', dptoPermitido(1, 4), ordemcrud.edit);

router.get('/cadastro_ordemservico', dptoPermitido(1, 4), ordemcrud.cadastro);

module.exports = router;