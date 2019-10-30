const Sequelize = require('sequelize');
const sequelize = require('./index');

module.exports = sequelize.define(
  'indicators',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
  },
  {
    tableName: 'indicators',
  },
);