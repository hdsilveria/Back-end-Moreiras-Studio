const Sequelize = require('sequelize')

const sequelize = new Sequelize("heroku_49ae44b7267e29e", "bb7dc15181b34c", "5572faf6", {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
    PORT: 3306
  })

  sequelize.authenticate().then(() =>{
      console.log("Conexão com sucesso!")}).catch((err) => { 
      console.log("Conexão com erro" + err)
  })

module.exports = sequelize;