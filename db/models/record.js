const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const Record = sequelize.define('Record', {
  mes_id: Sequelize.STRING,
  type: Sequelize.DATE
});


module.exports = Record
