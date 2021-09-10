const express = require('express')
const app = express()
app.use(express.json())
const auth = require('./config_user/auth')

const estoque = require('./router/estoque')
const agenda = require('./router/agenda')
const users = require('./router/users')
const login = require('./config_user/login')

const cors = require('cors')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

app.use('/estoque', auth, estoque)
app.use('/agenda', auth, agenda)
app.use('/users', auth, users)
app.use('/login', login)


var port = process.env.PORT || 5000
app.listen(port)