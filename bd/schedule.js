const Sequelize = require('sequelize')
const sequelize = require('./conect')

const agenda = sequelize.define('agenda', {
    cliente: {type: Sequelize.STRING, notNull: true, primaryKey: true },
    data: {type: Sequelize.STRING, notNull: true },
    horario: {type: Sequelize.STRING, notNull: true},
    procedimento: { type: Sequelize.STRING },
    tipo: { type: Sequelize.STRING },
  })

  agenda.sync({})

  module.exports = agenda;