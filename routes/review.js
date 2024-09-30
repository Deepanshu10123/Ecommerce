const express = require('express')
const Review = require('../models/Review')
const Product = require('../models/Product')
const { validateReview } = require('../middleware')
const router = express.Router()

router.post('/products/:id/review' ,validateReview , async(req,res)=>{
    try{
        let {id} = req.params
        let {rating,comment} = req.body
        const product = await Product.findById(id) // particular product nikaala
        const review = new Review({rating,comment}) // now making new review using class not by using model this time and sending the data to make document in reviews table

        product.reviews.push(review) // review ki iD ko ab push kar diya product model me jaha uski id ka object store hoga
        await review.save() // ab dono ko save kar diya in the middle changes karke 
        await product.save()
        req.flash('success','Review added successfully')
        res.redirect(`/products/${id}`)
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

module.exports = router 