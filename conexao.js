const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',     // Endereço do servidor MySQL
  user: 'root',          // Usuário do MySQL
  password: '',      // Senha do MySQL
  database: 'base_colaboradores',// Nome do banco de dados
  port: 3306             // Porta do MySQL somente se necessário)
});

db.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MySQL:', erro.message);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso');
});

module.exports = db;
