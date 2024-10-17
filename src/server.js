const express       = require('express')
const logger        = require('morgan')
const {connectDB}   = require('./config/index.js')
const appRouter     = require('./routes/')
//const {initializePassport} = require('./config/passport.config.js')
const {initializePassportjwt} = require('./config/passportjwt.config.js')
const passport      = require('passport')


//SOCKET ******************************
const {Server} = require('socket.io')
const {engine} = require('express-handlebars')
const { productModel } = require('./models/products.model.js')
const cookieParser = require('cookie-parser')
//******************************************* */

const app = express()
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

// endpoint
app.use(appRouter)
app.use(cookieParser('palabrasecreta'))

//Passport JWT

//initializePassport()
initializePassportjwt()
app.use(passport.initialize())


app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})



const httpServer = app.listen(PORT,()=>{
    console.log(`Listening : ${PORT}`)
})

//base de datos mongo
connectDB()

const io = new Server(httpServer)

io.on('connection', async(socket) =>{  
    console.log("Cliente conectado")
    const productos = await productModel.find()
    socket.emit('productos',productos)

    socket.on('addProducto',async(product)=>{
    
        //const result = prodManagerFs.createProductwebsocket(newproduct)
        const nwproduct = await productModel.create({...product})
        if(nwproduct)
            productos.push(nwproduct)
            console.log(productos)
            socket.emit('productos',productos)
    
    })
})
