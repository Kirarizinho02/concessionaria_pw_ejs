const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) =>{
            if (err) {
                res.json(err);
            }
            conn.query('SELECT * FROM ordem_servico', (err, ordem) =>{
                if (err) {
                    return res.status(500).send('Erro ao consultar a ordem de serviço');
                }
            res.render('busca_ordemservico', {
                data: ordem,
                isEdit: false
            });
        });
    });
}

controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO ordem_servico set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/busca_ordemservico');
        });
    });
};

controller.delete = (req, res) =>{
    const { numero } = req.params;

    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM ordem_servico WHERE osNum = ?', [numero], (err, result) => {
        if (err) {
            res.json(err);
        }

        res.redirect('/busca_ordemservico');
        });
    });
};

controller.update = (req, res) => {
    const { osNum, osFuncMat, osClienteCPF, osVeicPlaca, osDataRetirada, osDataDevolucao, osKmRetirada, osKmDevolucao, osStatus, osValorPgto } = req.body;

    if (!osNum || !osFuncMat || !osClienteCPF || !osDataRetirada  || !osVeicPlaca  || !osDataDevolucao || !osKmRetirada || !osKmDevolucao || !osStatus || !osValorPgto) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE ordem_servico SET osFuncMat = ?, osClienteCPF = ?, osVeicPlaca = ?, osDataRetirada = ?, osDataDevolucao = ?, osKmRetirada = ?, osKmDevolucao = ?, osStatus = ?, osValorPgto = ? WHERE osNum = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [osFuncMat, osClienteCPF, osVeicPlaca, osDataRetirada, osDataDevolucao, osKmRetirada, osKmDevolucao, osStatus, osValorPgto, osNum], (err, result) => {
            if (err) {
                console.error(err);

                console.log(conn.format(query, [osFuncMat, osClienteCPF, osVeicPlaca, osDataRetirada, osDataDevolucao, osKmRetirada, osKmDevolucao, osStatus, osValorPgto, osNum]));
                return res.status(500).send('Erro ao atualizar a ordem de serviço');
            }
            
            res.redirect('/busca_ordemservico');
        });
    });
};

controller.edit = (req, res) => { 
    const { numero } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        const queryOrdem = 'SELECT * FROM ordem_servico WHERE osNum = ?';
        const queryFuncionarios = 'SELECT funcMatricula FROM funcionarios';
        const queryClientes = 'SELECT clienteCPF FROM clientes';
        const queryVeiculos = 'SELECT veicPlaca FROM veiculos';

        conn.query(queryOrdem, [numero], (err, ordens) => {
            if (err) {
                return res.status(500).send('Erro ao buscar ordem de serviço');
            }

            conn.query(queryFuncionarios, (err, funcionarios) => {
                if (err) {
                    return res.status(500).send('Erro ao buscar funcionários');
                }

                conn.query(queryClientes, (err, clientes) => {
                    if (err) {
                        return res.status(500).send('Erro ao buscar clientes');
                    }

                    conn.query(queryVeiculos, (err, veiculos) => {
                        if (err) {
                            return res.status(500).send('Erro ao buscar veículos');
                        }

                        res.render('cadastro_ordemservico', {
                            ordemAtual: ordens[0],
                            funcionarios,
                            clientes,
                            veiculos,
                            isEdit: true,
                        });
                    });
                });
            });
        });
    });
};

controller.cadastro = (req, res) => { 

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        const queryFuncionarios = 'SELECT funcMatricula FROM funcionarios';
        const queryClientes = 'SELECT clienteCPF FROM clientes';
        const queryVeiculos = 'SELECT veicPlaca FROM veiculos';

            conn.query(queryFuncionarios, (err, funcionarios) => {
                if (err) {
                    return res.status(500).send('Erro ao buscar funcionários');
                }

                conn.query(queryClientes, (err, clientes) => {
                    if (err) {
                        return res.status(500).send('Erro ao buscar clientes');
                    }

                    conn.query(queryVeiculos, (err, veiculos) => {
                        if (err) {
                            return res.status(500).send('Erro ao buscar veículos');
                        }

                        res.render('cadastro_ordemservico', {
                            funcionarios,
                            clientes,
                            veiculos,
                            isEdit: false,
                        });
                    });
                });
            });
        });
};

module.exports = controller;