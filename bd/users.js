const Sequelize = require('sequelize')
const sequelize = require('./conect')

const users = sequelize.define('usuarios', {
    usuario: {type: Sequelize.STRING, notNull: true},
    email: {type: Sequelize.STRING, notNull: true},
    password: {type: Sequelize.STRING, notNull: true},
    perfil: {type: Sequelize.INTEGER, defaultValue: 1},
  })

  users.sync({})

  module.exports = users;