const controller = {};

exports.paginaindex = (req, res) => {
    res.render('index');
};

exports.adm = (req, res) => {
    res.render('administrador');
};

exports.cadastroCli = (req, res) => {
    const isEdit = req.query.isEdit === 'true';
    res.render('cadastro_clientes', { isEdit });
    console.log(isEdit);
};

exports.cadastroVeic = (req, res) => {
    const isEdit = req.query.isEdit === 'true';
    res.render('cadastro_carros', { isEdit });
};

exports.cadastroFunc = (req, res) => {
    const isEdit = req.query.isEdit === 'true';
    res.render('cadastro_funcionarios', { isEdit });
};

exports.cadastroUser = (req, res) => {
    const isEdit = req.query.isEdit === 'true';
    res.render('cadastro_usuarios', { isEdit });
};

exports.buscaCli = (req, res) => {
    res.render('busca_clientes');
};

exports.buscaVeic = (req, res) => {
    res.render('busca_carros');
};

exports.buscaFunc = (req, res) => {
    res.render('busca_funcionarios');
};

exports.buscaOrdemServ = (req, res) => {
    res.render('busca_ordemservico');
};

exports.buscaUser = (req, res) => {
    res.render('busca_usuarios');
};
