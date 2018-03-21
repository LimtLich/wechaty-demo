const Sequelize = require('sequelize');
const sequelize = new Sequelize('wxbot', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize
