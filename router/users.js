const express = require('express')
const router = express.Router()
const users = require('../bd/users')
const { Op } = require("sequelize")
const app = express()
const bcrypt = require('bcryptjs')

router.post("/createUser", async (req, res) => {

  dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8)

  users.create(dados)
    .then(() => {
      return res.status(200).json({
          error: false,
          message: "Usuario registrado com sucesso!"
      })
    })
    .catch(() => {
      return res.status(400).json({
          error: true,
          message: "Erro interno!"            
      })
  })
})


router.delete("/deleteUser", (req, res) => {
  users.destroy({where: {id: req.body.id}})
    .then(() => {
      return res.status(200).json({
          error: false,
          message: "Usuario Deletado!"})
      })
    .catch(() => {
      return res.status(400).json({
          error: true,
          message: "Usuario não Deletado"
      })
  })
})

router.get("/", (req, res) => {
  users.findAndCountAll({})
  .then((users) => {
    var allUsers = []
    console.log(users.rows)
    users.rows.map(arr => allUsers.push(
      { 
        id: arr.id,
        user: arr.usuario, 
        email: arr.email,
        profile: arr.perfil,
      }
    ))
    return res.json(allUsers)
  })
  .catch((err) => {
    console.log(err)
    return res.status(400).json({
        error: true,
        message: "Busca não realizada!"
    })
  })
})

router.get("/buscaUser", (req, res) => {
  users.findOne({ where: {[Op.and]:[{email: req.body.email, password: req.body.password}]} })
    .then((user) => {
      return res.json([user.email, user.usuario, user.perfil])
  })
    .catch(() => {
      return res.status(404).json({
        error: true,
        message: "Usuario não encontrado!"
      })
  })
})

module.exports = router