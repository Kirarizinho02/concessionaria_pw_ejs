const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
            if (err) {
                res.json(err);
            }

            conn.query('SELECT * FROM usuarios', (err, usuario) =>{
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            console.log("ei"+usuario);
            res.render('busca_usuarios', {
                data: usuario,
                isEdit: false
            });
        });
    });
}

controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO usuarios set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        console.log
        res.redirect('/administrador');
        });
    });
};

controller.delete = (req, res) =>{
    const { senha } = req.params;
    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM usuarios WHERE usuarioSenha = ?', [senha], (err, result) => {
        if (err) {
            res.json(err);
        }

        res.redirect('/busca_usuarios');
        });
    });
};

controller.update = (req, res) => {
    const {usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus} = req.body;

    console.log(usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioSetor, usuarioStatus);

    if (!usuarioLogin || !usuarioSenha || !usuarioFuncMat || !usuarioSetor || !usuarioStatus) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE usuarios SET usuarioLogin = ?, usuarioFuncMat = ?, usuarioSetor = ?, usuarioStatus = ? WHERE usuarioSenha = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [usuarioLogin, usuarioFuncMat, usuarioSetor, usuarioStatus, usuarioSenha], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o usuário');
            }

            res.redirect('/busca_usuarios');
        });
    });
};

controller.edit = (req, res) => { 
    
    const { senha } = req.params;
   

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM usuarios WHERE usuarioSenha = ?', [senha], (err, clientes) => {
          if (err) {
              return res.status(500).send('Erro ao conectar ao banco de dados');
          }
          console.log(senha);
          
          res.render('cadastro_usuarios', {
              usuarioAtual: clientes[0],
              isEdit: true,
          });
      });
  });
    
}

module.exports = controller;