const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.SQLDB, process.env.SQLUSER, process.env.SQLPASS, {
  host: process.env.SQLHOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
    underscored: true,
  },
  logging: false,
});

module.exports = sequelize;