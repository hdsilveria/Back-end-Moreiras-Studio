const express = require('express')
const router = express.Router()
const estoque = require('../bd/inventory')
const app = express()

router.get("/", (req, res) => {
  estoque.findAndCountAll({
    offset: parseInt(req.query.page),
    limit: parseInt(req.query.size)
  })
  .then((estoque) => {
    return res.json(estoque)
  }).catch(() => {
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!"
    })
  })
})

router.get("/:id", (req, res) => {
  estoque.findOne({where: {id: req.params.id}})
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


router.put("/material/:id", (req, res) => {
  estoque.update( req.body, { where: { id: req.params.id}} )
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


router.delete("/material/:id", (req, res) => {
  estoque.destroy({where: {id: req.params.id}})
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