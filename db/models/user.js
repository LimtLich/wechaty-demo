const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const User = sequelize.define('User', {
  userName: Sequelize.STRING,
  userId: Sequelize.INTEGER
});


module.exports = User
