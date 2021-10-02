const Sequelize = require('sequelize')

const sequelize = new Sequelize("studio_M", "usuario", "senha", {
    host: 'localhost',
    dialect: 'mysql',
    PORT: 3306
  })

  sequelize.authenticate()
    .then(() =>{
      console.log("Conexão com sucesso!")
    })
    .catch((err) => { 
      console.log("Conexão com erro" + err)
    })

module.exports = sequelize;
