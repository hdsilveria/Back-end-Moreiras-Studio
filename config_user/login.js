const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('../bd/users')

router.post("/", async (req, res) => {

  const user = await users.findOne({ where: [{email: req.body.email}] })

    if(user === null){
        return res.status(401).json({message_1: "Erro ao autenticar!"})
    }        

    if (!(await bcrypt.compare(req.body.password, user.password))){
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
        token
    })
    
})

module.exports = router