const express = require('express')
const app = express()
app.use(express.json())

const sequelize = require('./bd/conect')
const estoque = require('./bd/estoque')

const cors = require('cors')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})


app.get("/estoque", (req, res) => {
    estoque.findAll({}).then((estoque) => {
        return res.json(estoque)

    }).catch((err) => {

        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Busca não realizada!"
        })
    })
})


app.post("/inserirMaterial", (req, res) => {
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


    app.put("/alterarMaterial", (req, res) => {
        estoque.update( req.body, { where: { id: req.body.id}} ).then(() => {
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


app.delete("/deletarMaterial", (req, res) => {
    estoque.destroy({where: {id: req.body.id}}).then(() => {
        return res.status(200).json({
            error: false,
            message: "Material Deletado!"})
        }).catch(() => {
  
        return res.status(400).json({
            error: true,
            message: "Material não Deletado"
            })
        })
    })


app.listen(3001, () => {
    console.log("Servidor em Produção!")
})