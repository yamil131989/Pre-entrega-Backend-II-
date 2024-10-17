const { Router } = require('express')

const cartRouter = require('./carts.router.js')
const productRouter = require('./products.router.js')
const userRouter = require('./user.router.js')
const viewsRouter = require('./views.router.js')
const sessionRouter =require('./sessions.router.js')


const app = Router()

app.use('/api/products', productRouter)
app.use('/api/carts',cartRouter)
app.use('/', viewsRouter)
app.use('/products',productRouter)
app.use('/api/users', userRouter)
app.use('/api/sessions', sessionRouter)



module.exports = app