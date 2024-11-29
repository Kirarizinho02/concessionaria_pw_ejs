module.exports = function authDepto(...allowedDeptos) { //Export da função para garantir a autenticação de user
    return function (req, res, next) { //Essa é a função que ele tá exportando de verdade
        if (req.session.user && allowedDeptos.includes(req.session.user.depto)) { //If básico
            next(); //Continua a thread, rota, o que vier a seguir
        } else { 
            res.status(403).send('Acesso negado, seu departamento não permite acesso a essa tela.'); //Erro de autenticação
        }
    };
};
