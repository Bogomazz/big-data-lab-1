const Sequelize = require('sequelize');
const sequelize = require('./index');

module.exports = sequelize.define(
  'countries',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
  },
  {
    tableName: 'countries',
  },
);