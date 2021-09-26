const express = require('express');
const router = express.Router()
const agenda = require('../bd/agenda')

router.post("/horario", (req, res) => {
  agenda.create(req.body).then(response => {
    return res.status(200).json({
      error: false,
      id: response.id,
      message: "Horario inserido!"})
    }).catch(() => {
    return res.status(400).json({
      error: true,
      message: "Horario não inserido"            
    })
  })
})


router.put("/horario", (req, res) => {
  agenda.update( req.body, { where: { id: req.body.id}} )
  .then(() => {
    return res.status(200).json({
      error: false,
      message: "Horario Atualizado!"})
  })
  .catch(() => {
    return res.status(400).json({
      error: true,
      message: "Horario não Atualizado!"
    })
  })
})


router.delete("/horario", (req, res) => {
  agenda.destroy({where: {id: req.body.id}})
    .then(() => {
      return res.status(200).json({
        error: false,
        message: "Horario Deletado!"})
      })
    .catch(() => {
      return res.status(400).json({
        error: true,
        message: "Horario não Deletado"
      })
  })
})

router.get("/", (req, res) => {
  agenda.findAndCountAll({ 
    offset: req.body.page,
    limit: req.body.length,
    order: [['data','DESC'],['horario','DESC']],
  })
  .then((horarios) => {
    return res.json({
      page: req.body.page,
      rows: req.body.length,
      data: horarios,
    })
  })
  .catch(() => {
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!"
    })
  })
})

module.exports = router