const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Record = sequelize.define('Record', {
  from: Sequelize.STRING,
  to: Sequelize.STRING,
  type: Sequelize.STRING,
  content: Sequelize.STRING
});


module.exports = Record
