const Sequelize = require('sequelize')
const sequelize = require('./conect')

const estoque = sequelize.define('materiais', {
    material: {type: Sequelize.STRING, notNull: true},
    quantidade: {type: Sequelize.INTEGER, notNull: true},
    valor: {type: Sequelize.FLOAT, notNull: true},
    data: {type: Sequelize.STRING}
  })

  estoque.sync({})

  module.exports = estoque;