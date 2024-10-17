// const passport = require('passport')
// const jwt = require('passport-jwt')
// const {PRIVATE_KEY} = require('../utils/jwt.js')

// const JWTStrategy = jwt.Strategy
// const ExtractJWT = jwt.ExtractJwt

// const initializePassport = ()=>{
//     //estrategias
//     const cookieExtractor = req =>{ //extrae las cookies del req
//         let token = null
//         if(req && req.cookies){
//             token = req.cookies[token] // token = token navegador como sea el nombre
//         }
//         return token
//     }

//     passport.use('jwt',new JWTStrategy({
//         jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
//         secretOrKey: PRIVATE_KEY
//     },async (jwt_payload,done)=>{
//         try {
//             return done(null,jwt_payload)
//         } catch (error) {
//             return done(error)
//         }
//     }))

// }

// module.exports = {
//     initializePassport
// }
const passport = require('passport')
const jwt = require('passport-jwt')
const {PRIVATE_KEY} = require('../utils/jwt.js')

const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

//const userService = new userManagerMongo()


const initializePassport = ()=>{
    //extrae de las token las cookies
    const cookieExtractor = req =>{
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        }
        return token
    }
    //desencripta lo de cookeextractor
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]) ,
        secretOrKey: PRIVATE_KEY
    },async(jwt_payload,done)=>{
        try {
           //una vez desencriptado continuamos el proceso manmdando contenido del jwt
           return done(null, jwt_payload)     
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = {
    initializePassport
}