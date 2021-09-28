const Sequelize = require('sequelize')
const sequelize = require('./conect')

const clients = sequelize.define('clients', {
    name: {type: Sequelize.STRING, notNull: true},
    age: {type: Sequelize.INTEGER, notNull: true},
    tel: {type: Sequelize.STRING, notNull: true},
    birthday: {type: Sequelize.STRING, notNull: true},
  })

  clients.sync({})

  module.exports = clients;