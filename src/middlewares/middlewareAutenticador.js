module.exports = function authDepto(...allowedDeptos) {
    return function (req, res, next) {
        if (req.session.user && allowedDeptos.includes(req.session.user.depto)) {
            next(); 
        } else {
            res.status(403).send('Acesso negado, seu departamento não permite acesso a essa tela.'); 
        }
    };
};
