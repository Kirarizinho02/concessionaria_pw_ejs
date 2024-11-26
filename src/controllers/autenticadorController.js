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

        conn.query('SELECT * FROM usuarios WHERE usuarioLogin = ? AND usuarioSenha = ?', [usuarioLogin, usuarioSenha], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao consultar o banco de dados.' });
            }

            if (results.length > 0) {
                return res.redirect('/administrador'); 
            } else {
                return res.status(401).json({ message: 'Acesso negado. Usuário ou senha incorretos.' });
            }
        });
    });
};

module.exports = controller;