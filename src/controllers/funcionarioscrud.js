const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
            if (err) {
                res.json(err);
            }
            conn.query('SELECT * FROM funcionarios', (err, funcionario) =>{
                if (err) {
                    return res.status(500).send('Erro ao consultar os funcionarios');
                }

            console.log("oi"+funcionario);
            res.render('busca_funcionarios', {
                data: funcionario,
                isEdit: false
            });
        });
    });
}

controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO funcionarios set ?', [data], (err, funcionario) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/busca_funcionarios');
        });
    });
};

controller.delete = (req, res) =>{
    const { matricula } = req.params;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM funcionarios WHERE funcMatricula = ?', [matricula], (err, result) => {
        if (err) {
            res.json(err);
        }

        res.redirect('/busca_funcionarios');
        });
    });
};

controller.update = (req, res) => {
    const { funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo } = req.body;

    if (!funcMatricula || !funcNome || !funcDepto || !funcAdmissao  || !funcSalario  || !funcFilho || !funcSexo || !funcAtivo) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE funcionarios SET funcNome = ?, funcDepto = ?, funcSalario  = ?, funcSexo = ?, funcAdmissao  = ?, funcFilho = ?, funcAtivo = ? WHERE funcMatricula = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [funcNome, funcDepto, funcSalario, funcSexo, funcAdmissao, funcFilho, funcAtivo, funcMatricula], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o funcionario');
            }

            res.redirect('/busca_funcionarios');
        });
    });
};

controller.edit = (req, res) => { 
    
    const { matricula } = req.params;
   

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [matricula], (err, clientes) => {
          if (err) {
              return res.status(500).send('Erro ao conectar ao banco de dados');
          }
          
          res.render('cadastro_funcionarios', {
              funcAtual: clientes[0],
              isEdit: true,
          });
      });
  });
    
}

module.exports = controller;