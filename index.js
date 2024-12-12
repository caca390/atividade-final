// Importações
const express = require('express');
const db = require('./conexao');
const cors = require('cors');

// Criar o app NodeJS
const app = express();

// Habilitar CORS para todas as rotas
app.use(cors());

// Usar o middleware para aceitar JSON
app.use(express.json());

// Rodar o Servidor
const porta = 3000;
app.listen(porta, () => {
    console.log("Servidor executando na porta de nº " + porta);
});

app.get('/pessoas', (req, res) => {
    const sql = "SELECT * FROM vw_tudo";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao consultar: " + erro.message });
        }
        return res.json(resultados);
    });
});

app.get('/pessoas/ativos', (req, res) => {
    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'ativo'";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao consultar: " + erro.message });
        }
        return res.json(resultados);
    });
});

app.get('/pessoas/inativos', (req, res) => {
    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'inativo'";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao consultar: " + erro.message });
        }
        return res.json(resultados);
    });
});

app.get('/funcoes', (req, res) => {
    const sql = "SELECT * FROM tb_funcoes";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao consultar: " + erro.message });
        }
        return res.json(resultados);
    });
});

app.post('/pessoas', (req, res) => {
    const { nome, funcao, situacao} = req.body;
    const sql = `INSERT INTO tb_colaboradores (nome, fk_funcao, situacao) VALUES (?, ?, ?)`;
    db.query(sql, [nome, funcao, situacao], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao cadastrar: " + erro.message });
        }
        return res.json({ mensagem: "Cadastrado com sucesso!" });
    });
});

app.post('/funcoes', (req, res) => {
    const {cargo} = req.body;
    const sql = `INSERT INTO tb_funcoes (cargo) VALUES (?)`;
    db.query(sql, [cargo], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao cadastrar: " + erro.message });
        }
        return res.json({ mensagem: "Cadastrado com sucesso!" });
    });
});

app.delete('/pessoas/:id', (req, res) => {
    const id_informado = req.params.id;
    const sql = `DELETE FROM tb_colaboradores WHERE matricula = ?`;
    db.query(sql, [id_informado], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao deletar: " + erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.json({ mensagem: "Nenhum cadastro foi deletado." });
        }
        return res.json({ mensagem: "Deletado com sucesso!" });
    });
}); 

app.delete('/funcoes/:id', (req, res) => {
    const id_informado = req.params.id;
    const sql = `DELETE FROM tb_funcoes WHERE cod_funcao = ?`;
    db.query(sql, [id_informado], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao deletar: " + erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.json({ mensagem: "Nenhum cadastro foi deletado." });
        }
        return res.json({ mensagem: "Deletado com sucesso!" });
    });
}); 

app.put('/pessoas', (req, res) => {
    const { nome, fk_funcao, situacao, id} = req.body;
    const sql = `UPDATE tb_colaboradores SET nome = ?, fk_funcao = ?, situacao = ? WHERE matricula = ?`;

    db.query(sql, [nome, fk_funcao, situacao, id], (erro, resultado) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao atualizar: " + erro.message });
        }
        
        if (resultado.affectedRows === 0) {
            return res.json({ mensagem: "Nenhum cadastro foi atualizado." });
        }
        return res.json({ mensagem: "Atualizado com sucesso!" });
    });
}); 

app.put('/funcoes', (req, res) => {
    const { nome, id} = req.body;
    const sql = `UPDATE tb_funcoes SET cargo = ? WHERE cod_funcao = ?`;

    db.query(sql, [nome, id], (erro, resultado) => {
        if (erro) {
            return res.json({ mensagem: "Falha ao atualizar: " + erro.message });
        }
        
        if (resultado.affectedRows === 0) {
            return res.json({ mensagem: "Nenhum cadastro foi atualizado." });
        }
        return res.json({ mensagem: "Atualizado com sucesso!" });
    });
}); 
