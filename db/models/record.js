const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Record = sequelize.define('Record', {
  from_name: Sequelize.STRING,
  from_uin: Sequelize.STRING,
  to_name: Sequelize.STRING,
  to_uin: Sequelize.STRING,
  type: Sequelize.STRING,
  content: Sequelize.STRING
});


module.exports = Record
