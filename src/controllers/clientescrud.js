const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
            if (err) {
                res.json(err);
            }
            conn.query('SELECT * FROM clientes', (err, cliente) =>{
                if (err) {
                    return res.status(500).send('Erro ao consultar os clientes');
                }
            res.render('busca_clientes', {
                data: cliente,
                isEdit: false
            });
        });
    });
}

controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO clientes set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/busca_clientes');
        });
    });
};

controller.delete = (req, res) =>{
    const { cpf } = req.params;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM clientes WHERE clienteCPF = ?', [cpf], (err, result) => {
        if (err) {
            res.json(err);
        }

        res.redirect('/busca_clientes');
        });
    });
};

controller.update = (req, res) => {
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteDataNasc, clienteCNH, clienteCidade, clienteCNHCat } = req.body;

    if (!clienteCPF || !clienteNome || !clienteEnde || !clienteDataNasc || !clienteTel || !clienteCNH || !clienteCidade || !clienteCNHCat) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE clientes SET clienteNome = ?, clienteEnde = ?, clienteTel = ?, clienteCidade = ?, clienteDataNasc = ?, clienteCNH = ?, clienteCNHCat = ? WHERE clienteCPF = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat, clienteCPF], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente');
            }

            res.redirect('/busca_clientes');
        });
    });
};

controller.edit = (req, res) => { 
    
    const { clienteCPF } = req.params;
   

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, clientes) => {
          if (err) {
              return res.status(500).send('Erro ao conectar ao banco de dados');
          }
          
          res.render('cadastro_clientes', {
              clienteAtual: clientes[0],
              isEdit: true,
          });
      });
  });
    
}

module.exports = controller;