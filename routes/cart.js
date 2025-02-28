const express = require('express')
const {isLoggedIn} = require('../middleware')
const Product = require('../models/Product')
const User = require('../models/User')
const router = express.Router()

router.get('/user/cart',isLoggedIn, async(req,res)=>{
    let user = await User.findById(req.user._id).populate('cart')
    res.render('cart/cart',{user})
})

router.post('/user/:productId/add', isLoggedIn, async(req,res)=>{
    let {productId}=req.params
    let userId = req.user._id
    let product = await Product.findById(productId)
    let user = await User.findById(userId)
    user.cart.push(product)
    await user.save()
    res.redirect('/user/cart')
})


module.exports = router