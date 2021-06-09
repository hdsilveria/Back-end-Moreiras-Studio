const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const decode = jwt.verify(token, 'system_estoque')
        req.usuarioJWT = decode;
        console.log(decode)
        next()

    } 
    
    catch(err) {
        return res.status(401).json({
            mensagem: "Erro: não autenticado" 
        })
    }
    
}