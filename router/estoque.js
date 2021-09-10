const express = require('express');
const router = express.Router()
const estoque = require('../bd/estoque')

const cors = require('cors')
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors())
  next()
})

router.get("/", (req, res) => {
  estoque.findAndCountAll({})
  .then((estoque) => {
    return res.json(estoque)
  }).catch(() => {
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!"
    })
  })
})


router.post("/material", (req, res) => {
  estoque.create(req.body).then(() => {
      return res.status(200).json({
        error: false,
        message: "Material inserido!"})
      }).catch(() => {
      return res.status(400).json({
        error: true,
        message: "Material não inserido"            
      })
  })
})


router.put("/material", (req, res) => {
  estoque.update( req.body, { where: { id: req.body.id}} )
  .then(() => {
      return res.status(200).json({
        error: false,
        message: "Material Atualizado!"})
  }).catch(() => {
      return res.status(400).json({
        error: true,
        message: "Atualização não realizada!"
      })
  })
})


router.delete("/material", (req, res) => {
  estoque.destroy({where: {id: req.body.id}})
    .then(() => {
      return res.status(200).json({
        error: false,
        message: "Material Deletado!"})
    })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Material não Deletado"
      })
    })
})

module.exports = router