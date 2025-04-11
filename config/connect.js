const { Sequelize } = require('sequelize');

// Criando a instância do Sequelize para se conectar ao banco de dados MySQL
const sequelize = new Sequelize('tarefas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Define se você quer que o Sequelize log os queries no console
  dialectOptions: {
    charset: 'utf8mb4_general_ci', // Garantir compatibilidade com caracteres especiais
  }
});

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
