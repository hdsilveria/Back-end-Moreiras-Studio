const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const authHeaders =  req.headers.authorization;
    const [ , token] = authHeaders.split(' ')

    try {
        
        const decode = jwt.verify(token, 'system_estoque')
        console.log(decode)
        next()

    } 
    
    catch(err) {
        return res.status(401).json({
            mensagem: "Erro: não autenticado" 
        })
    }
    
}