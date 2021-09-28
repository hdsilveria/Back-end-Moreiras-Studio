const express = require('express');
const router = express.Router()
const client = require('../bd/clients')

router.get("/", (req, res) => {
  client.findAndCountAll({
    offset: parseInt(req.query.page),
    limit: parseInt(req.query.size)
  })
  .then((response) => {
    return res.json(response)
  }).catch(() => {
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!"
    })
  })
})

router.post("/insertClient", (req, res) => {
  client.create(req.body).then(() => {
      return res.status(200).json({
        error: false,
        message: "Cliente inserido!"})
      }).catch(() => {
      return res.status(400).json({
        error: true,
        message: "Cliente não inserido"            
      })
  })
})

module.exports = router