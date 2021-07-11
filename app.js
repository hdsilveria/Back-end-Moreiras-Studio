const express = require('express')
const app = express()
app.use(express.json())
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = require('./config_user/auth')

const sequelize = require('./bd/conect')
const { Op } = require("sequelize");
const estoque = require('./bd/estoque')
const users = require('./bd/users')
const agenda = require('./bd/agenda')

const cors = require('cors')
const auth = require('./config_user/auth')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})


app.post("/login", async (req, res) => {

  const user = await users.findOne({ where: [{email: req.body.email}] })

    if(user === null){
        return res.status(401).json({message_1: "Erro ao autenticar!"})
    }        

    if (!(await bcrypt.compare(req.body.password, user.password))){
        console.log(user)
        return res.status(401).json({message_2: "Erro ao autenticar!"})
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        perfil: user.perfil
        }, 
        "849bb516b4e697812ce52e293435bc9b", 
        { 
        expiresIn: 3000
    })

    return res.status(201).json({
        Error: false,
        Mensagem: "Usuario Autenticado",
        Usuario: user.usuario,
        Perfil: user.perfil, 
        token})
    
})

app.get("/estoque", auth, (req, res) => {
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


app.post("/inserirMaterial", auth, (req, res) => {
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



app.post("/criarUser", auth, async (req, res) => {

    dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8)

    users.create(dados).then(() => {
    
        return res.status(200).json({
            error: false,
            message: "Usuario registrado com sucesso!"
        })
    
        }).catch(() => {
    
        return res.status(400).json({
            error: true,
            message: "Erro interno!"            
        })
    })
})


app.get("/usuarios", (req, res) => {

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





app.post("/inserirHorario", auth, (req, res) => {
    agenda.create(req.body).then(() => {

        return res.status(200).json({
            error: false,
            message: "Horario inserido!"})

        }).catch(() => {

        return res.status(400).json({
            error: true,
            message: "Horario não inserido"            
        })
    })
})


app.put("/alterarHorario", (req, res) => {
    agenda.update( req.body, { where: { id: req.body.id}} ).then(() => {
        return res.status(200).json({
            error: false,
            message: "Horario Atualizado!"})

    }).catch(() => {

        return res.status(400).json({
            error: true,
            message: "Horario não realizada!"
        })
    })
})


app.delete("/deletarHorario", (req, res) => {
    agenda.destroy({where: {id: req.body.id}}).then(() => {
        return res.status(200).json({
            error: false,
            message: "Horario Deletado!"})
        }).catch(() => {
  
        return res.status(400).json({
            error: true,
            message: "Horario não Deletado"
        })
    })
})

app.get("/horarios", auth, (req, res) => {
    agenda.findAll({ order: [['data','DESC'],['horario','DESC']]}).then((horarios) => {
        return res.json(horarios)

    }).catch((err) => {

        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Busca não realizada!"
        })
    })
})




app.listen(3001, () => {
    console.log("Servidor em Produção!")
})