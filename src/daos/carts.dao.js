const { request,response } = require('express')
const {cartModel} = require('../models/carts.model.js')
const {productModel} = require('../models/carts.model.js')


const addCart  = async(req= request,res= response)=>{
    try {
        const cart = await cartModel.create({})
        return res.json({msg:"Carrito creado",cart})
    } catch (error) {    
        console.log(error)
        return res.status(500).json({msg:'Server Error , agregando el carrito '})
    }
}

const getCartsbyId  = async(req= request,res= response)=>{
   try {
       const {cid} = req.params
       const cart = await cartModel.findById(cid).populate('products.id')
       if(cart)
            return res.json({cart})
        res.status(404).json({msg:"Carrito no existe"})
    } catch (error) {    
       console.log(error)
       return res.status(500).json({msg:'Server Error , obteniendo el carrito '})
   }
}
///:cid/products/:pid'
 const addProductToCart  = async(req= request,res= response)=>{
    try {
            const {cid,pid} = req.params
            const cart = await cartModel.findById(cid)
          

            if(!cart)
                return res.status(404).json({msg:"El Carrito no existe"})            
            //const prod = cart.products.find(prod=>prod.id.toString()===pid)            
            const prodinCart = cart.products.find(prod=>prod.id.toString() === pid)            

            if(prodinCart){
                prodinCart.quantity++                
            } else {
                cart.products.push({id:pid,quantity:1})
            }
            
            cart.save()
            return res.json({msg:"Producto agregado",cart})            

    } catch (error) {    
        console.log(error)
        return res.status(500).json({msg:'Server Error , agregando el producto al carrito '})
    }
}


const deleteProductinCart = async(req= request,res= response)=>{
    try {
        const {cid,pid} = req.params
        const cart = await cartModel.findByIdAndUpdate(cid,{$pull:{'products':{id:pid}}},{new:true})
        if(!cart)
            return res.status(404).json({msg:"No se pudo eliminar el producto"})
        return res.json({msg:"Producto eliminado",cart})

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Server Error , eliminando el producto al carrito '})
    }
}
const updateproductinCart  = async(req= request,res= response)=>{
    try {
        const {cid,pid} = req.params
        const {quantity} = req.body
        
        if(!quantity|| !Number.isInteger(quantity))
            return res.status(900).json({msg:"Ingresar quantity numerico"})

        const cart = await cartModel.findOneAndUpdate({_id:cid,'products.id':pid},{$set:{'products.$.quantity':quantity}},{new:true})
        if(!cart)
            return res.status(404).json({msg:"No se pudo eliminar el producto"})
        return res.json({msg:"Producto modificado",cart})

     } catch (error) {    
        console.log(error)
        return res.status(500).json({msg:'Server Error , obteniendo el carrito '})
    }
 }

 const deleteCart  = async(req= request,res= response)=>{
    try {
        const {cid} = req.params
        const cart = await cartModel.findByIdAndDelete(cid)
        if(!cart)
            return res.status(4049).json({msg:"No se pudo eliminar el carrito"})
        return res.json({msg:"Carrito eliminado",cart})
    } catch (error) {
        
    }
 }
 const getCartsbyIdHandle  = async(cid)=>{
    try {
       const result = await cartModel.findById(cid).populate('products.id').lean()
       console.log(result)
       return result
                             
     } catch (error) {    
        console.log(error)
        
    }
 }
module.exports = {getCartsbyId,addCart,addProductToCart,deleteProductinCart,updateproductinCart,deleteCart,getCartsbyIdHandle}


