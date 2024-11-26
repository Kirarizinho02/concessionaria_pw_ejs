const controller = {};

controller.login = (req, res) => {
    const { usuarioLogin, usuarioSenha } = req.body;

    if (!usuarioLogin || !usuarioSenha) {
        return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ message: 'Erro de conexão com o banco de dados.' });
        }

        const query = `SELECT u.usuarioLogin, f.funcDepto FROM usuarios u JOIN funcionarios f ON u.usuarioFuncMat = f.funcMatricula WHERE u.usuarioLogin = ? AND u.usuarioSenha = ?`;

        conn.query(query, [usuarioLogin, usuarioSenha], (err, usuarios) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
            }

            if (usuarios.length === 0) {
                return res.status(401).send('Senha ou usuário inválidos.')
            }
                req.session.user = {
                    login: usuarios[0].usuarioLogin,
                    depto: usuarios[0].funcDepto,
                };
                
                console.log(req.session);
                res.render('administrador',{
                usuario: req.session.user
        });
        });
    });
};

module.exports = controller;