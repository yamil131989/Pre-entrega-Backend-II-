const { Router } = require('express')
const { productModel } = require('../models/products.model.js')
const {getProductsHandle,getProducthandler} = require('../daos/products.dao.js')
const {getCartsbyIdHandle} = require('../daos/carts.dao.js')



const router = Router()


router.get('/',async (req,res)=>{
   const producResult = await getProductsHandle({...req.query})
   return res.render('products',{title:'Productos',producResult})
})
 
router.get('/realtimeproducts',async (req,res)=>{
 
   return res.render('realTimeProducts')

})

router.get('/products', async(req,res)=>{
   
   const producResult = await getProductsHandle({...req.query})
   return res.render('products',{title:'Productos',producResult})
})

router.get('/products/:pid', async(req,res)=>{
   
   const {pid} =req.params
   const producInfo = await getProducthandler(pid)


   return res.render('producto',{title:'Producto',producInfo})
})

router.get('/carts/:cid', async (req, res)=>{
   const {cid} = req.params
   console.log(cid)
   const cartResult = await getCartsbyIdHandle(cid)
   
   return res.render('carts',{title:'Carts', cartResult})
})

router.get('/login', (req, res) => {
    res.status(200).render('login')
})
router.get('/register', (req, res) => {
    res.status(200).render('register')
})


module.exports = router;
