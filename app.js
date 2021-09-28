const express = require('express')
const app = express()
app.use(express.json())

const invetory = require('./router/invetory')
const agenda = require('./router/schedule')
const users = require('./router/users')
const clients = require('./router/clients')
const login = require('./config_user/login')

const cors = require('cors')
const auth = require('./config_user/auth')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

app.use('/clientes', clients, auth)
app.use('/estoque', invetory, auth)
app.use('/agenda', agenda, auth)
app.use('/users', users, auth)
app.use('/login', login)


var port = process.env.PORT || 5000
app.listen(port)