const express = require('express')
const app = express()
app.use(express.json())
const jwt = require('jsonwebtoken')
const login = require('./config_user/auth')

const sequelize = require('./bd/conect')
const { Op } = require("sequelize");
const estoque = require('./bd/estoque')
const users = require('./bd/users')

const cors = require('cors')
const auth = require('./config_user/auth')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})

app.post("/login", (req, res) => {
    users.findOne({ where: {[Op.and]:[{email: req.body.email, password: req.body.password}]} })
    .then((user) => {

    if (!user){
        return res.status(401).json({message: "Erro ao autenticar!"})
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, "system_estoque", {
        expiresIn: 150
    })

    return res.status(200).json([
        {Usuario: user.usuario}, 
        {Email: user.email}, 
        {Perfil: user.perfil}, 
        {token: token}])
        
    })
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



app.post("/criarUser", (req, res) => {
    users.create(req.body).then((user) => {
    
        return res.status(200).json({
            error: false,
            message: "Usuario registrado com sucesso!",
            usuario: user
        })
    
        }).catch(() => {
    
        return res.status(400).json({
            error: true,
            message: "Erro interno!"            
        })
    })
})


app.get("/usuarios", auth, (req, res) => {
    users.findAll({}).then((usuario) => {
        return res.json(usuario)

    }).catch((err) => {

        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Busca não realizada!"
        })
    })
})

app.get("/buscaUser", (req, res) => {
    users.findOne({ where: {[Op.and]:[{email: req.body.email, password: req.body.password}]} }).then((user) => {
        return res.json([user.email, user.usuario, user.perfil])

    }).catch((err) => {

        console.log("Erro: " + err)
            return res.status(404).json({
                error: true,
                message: "Usuario não encontrado!"
        })
    })
})


app.listen(3001, () => {
    console.log("Servidor em Produção!")
})