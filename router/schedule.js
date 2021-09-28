const express = require('express');
const router = express.Router()
const agenda = require('../bd/schedule')

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


router.put("/horario/:id", (req, res) => {
  agenda.update( req.body, { where: { id: req.params.id}} )
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


router.delete("/horario/:id", (req, res) => {
  agenda.destroy({where: {id: req.params.id}})
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

router.get("/horario", async (req, res) => {
  const {page, size} = req.query

  agenda.findAndCountAll({     
    order: [['data','DESC'],['horario','DESC']],
    offset: parseInt(page),
    limit: parseInt(size),
  })
  .then((horarios) => {
    return res.json({
      data: horarios,
    })
  })
  .catch(err => {
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!",
      err
    })
  })
})

router.get("/horario/:id", (req, res) => {
  agenda.findOne({where: {id: req.params.id}})
  .then((horarios) => {
    return res.json({data:horarios})
  })
  .catch(err => {
    console.log(err)
    return res.status(400).json({
      error: true,
      message: "Busca não realizada!"
    })
  })
})


module.exports = router