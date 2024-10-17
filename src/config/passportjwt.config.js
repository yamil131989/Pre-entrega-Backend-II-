const passport = require('passport')
const jwt = require('passport-jwt')
const {PRIVATE_KEY} = require('../utils/jwt.js')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassportjwt = () =>{
    //extrae las cookie del req
    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        }
        return token
    }
    //middleware 
    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY //firma de token
    }, async (jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}
//jwt_payload contenido del token desencriptado


module.exports = {
    initializePassportjwt
}