const Product = require('./models/Product');
const {productSchema, reviewSchema} = require('./schema')

const validateProduct = (req, res, next)=>{
    const {name, img, price, desc} = req.body
    const { error } = productSchema.validate({ name, img, price, desc })
    if (error) {
        return res.render('error')
    }
    next()
}
const validateReview = (req, res, next)=>{
    const {rating, comment} = req.body
    const { error } = reviewSchema.validate({ rating, comment })
    if (error) {
        return res.render('error')
    }
    next()
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first');
        return res.redirect('/login');
    }
    next();
};

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You are not a seller')
        return res.redirect('/products')
    }
    else if(req.user.role !== 'seller')
    {
        req.flash('error', 'You are not a seller')
        return res.redirect('/products')
    }
    next()
}

// real author or not
const isProductAuthor = async (req, res, next) => {
    let { id } = req.params;
    let product = await Product.findById(id);

    // Check if the logged-in user is the author of the product
    if (!product.author.equals(req.user._id)) {
        req.flash('error', 'You are not the authorized seller of this product');
        return res.redirect('/products');
    }
    next();
};


module.exports = {isProductAuthor, isSeller,  isLoggedIn,validateProduct,validateReview}