const Sequelize = require('sequelize');
const sequelize = require('./index');

module.exports = sequelize.define(
  'indicators_data',
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    indicatorId: {
      type: Sequelize.STRING,
      field: 'indicator_id',
    },
    countryId: {
      type: Sequelize.STRING,
      field: 'country_id',
    },
    value: Sequelize.INTEGER,
    date: Sequelize.INTEGER
  },
  {
    tableName: 'indicators_data',
  },
);