const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const authHeaders =  req.headers.authorization;
    const [ , token] = authHeaders.split(' ')

    try {
        const decode = jwt.verify(token, '849bb516b4e697812ce52e293435bc9b')
        console.log(decode)
        next()
    } 
    
    catch(err) {
        return res.status(401).json({
            mensagem: "Erro: não autenticado" 
        })
    }
    
}