const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) =>{    
    req.getConnection((err, conn) =>{

        if (err) {
            res.json(err);
        }
        conn.query('SELECT * FROM veiculos', (err, veiculos) =>{
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

        console.log("oi"+veiculos);
        res.render('busca_carros', {
            data: veiculos
        });
    });
});
}

controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO veiculos set ?', [data], (err, veiculo) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/busca_carros');
        });
    });
};

controller.delete = (req, res) =>{
    const { placa } = req.params;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM veiculos WHERE veicPlaca = ?', [placa], (err, result) => {
        if (err) {
            res.json(err);
        }

        res.redirect('/busca_carros');
        });
    });
};



controller.update = (req, res) => {
    const {veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    if (!veicMarca || !veicModelo || !veicAno || !veicCor || !veicComb || !veicCat || !veicStatusAlocado) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE veiculos SET veicMarca = ?, veicModelo = ?, veicCor = ?, veicCat = ?, veicAno = ?, veicComb = ?, veicStatusAlocado = ? WHERE veicPlaca = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [veicMarca, veicModelo, veicCor, veicCat, veicAno, veicComb, veicStatusAlocado, veicPlaca], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente');
            }

            res.redirect('/busca_carros');
        });
    });
};

controller.edit = (req, res) => { 
    
    const { veicPlaca } = req.params;
   

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, clientes) => {
          if (err) {
              return res.status(500).send('Erro ao conectar ao banco de dados');
          }
          
          res.render('cadastro_carros', {
              veicAtual: clientes[0],
              isEdit: true,
          });
      });
  });
    
}


module.exports = controller;