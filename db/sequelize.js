const Sequelize = require('sequelize');
const sequelize = new Sequelize('wxbot', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  logging: false,
  timezone: '+08:00'
});

module.exports = sequelize
