const { Router } = require('express')
const UserDaoMongo = require('../daos/Mongo/userDaoMongo.js')
const { createHash, isValidPassword } = require('../utils/hash.js')
const { generateToken } = require('../utils/jwt.js')
const {cartModel} = require('../models/carts.model.js')
const passport = require('passport')
const {passportCall} = require('../passport/passportCall.js')
const {autenticacion} = require('../passport/autenticacion.js')




// zod libreria para validar data que se envia de formulario

const router = Router()
const usersService = new UserDaoMongo()


router.post('/register', async (req, res)=>{
    const { first_name, last_name, email, password, role } = req.body
    //console.log(first_name, last_name, email, password)
    if(!first_name || !email || !password) return res.status(400).send({stauts: 'success', message: 'deben venir todos los campos requeridos'})

    const userFound = await usersService.getUser({email})
    console.log(userFound)
    
    if(userFound) return response.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

    const newUser = {
        first_name,
        last_name, 
        email,
        password: createHash(password), // crear hash
        role,
        cartID: await cartModel.create({})
    }

    let result = await usersService.createUser(newUser)

   

    res.send({
        status: 'Usuario creado con exito',
        data: result
    })
})

router.post('/login', async (req, res)=>{
    const { email, password } = req.body

    if(!email || !password) return res.status(400).send({status: 'error', message: 'deben venir todos los campos requeridos'})

    const userFound = await usersService.getUser({email})
    if(!userFound) return res.status(401).send({status: 'error', message: 'No se encuentra el usuario con ese email'})

    // validar password 
    if(!isValidPassword(password, userFound.password)) return res.send({status: 'error', message: 'las credenciales no coinciden'})

    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        //email: userFound.email,
        role: userFound.role 
        //email: userFound.email, 
        // role: userFound.role === 'admin'
    })
    res.cookie('token',token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly:true
    }).send({
        status: 'success',
        data: userFound,        
        token
    })
})

//Modificado en passportCall

// router.get('/current', passport.authenticate('jwt',{session:false}), (req, res)=>{
//     console.log('en current')
//     res.send({dataUser: req.user, message:'datos sensibles'})
// }
// )

router.get('/current', passportCall('jwt'),autenticacion('admin'), (req, res)=>{    
    res.send({dataUser: req.user, message:'datos sensibles'})
}
)


router.post('/logout', (req, res)=>{
    res.send('logout')
})

module.exports = router