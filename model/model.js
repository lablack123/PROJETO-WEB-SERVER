const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect'); // Arquivo de conexão com o banco

const Lista = sequelize.define('lista', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(111),
    allowNull: false
  }
}, {
  tableName: 'lista',  // Nome da tabela no banco de dados
  timestamps: false    // A tabela não tem createdAt/updatedAt
});

module.exports = Lista;
