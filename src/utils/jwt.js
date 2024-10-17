
// //const PRIVATE_KEY = 'CoderSecretpara-lafirmA'
// const PRIVATE_KEY = 'LaPassMasFacilDelMundo'


const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'LaPassMasDificildelMundo'

const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '1d'})

const authTokenMiddleware = (req, res, next) => {
    /// lo que viene en headers
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if(!authHeader) return res.status(401).send({status: 'error', error: 'not authenticated'})
    
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, dataToken) => {
        if (dataToken.role !== 'admin') {
            return res.send('chau')
        }
        req.user = dataToken
        next()
    })
}

module.exports = {
    generateToken, 
    authTokenMiddleware,
    PRIVATE_KEY
}