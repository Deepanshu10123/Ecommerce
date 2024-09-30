const mongoose = require('mongoose')
const Review = require('./Review')

// const { propfind } = require('../routes/review')

let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    img:{
        type:String,
        require:true,
        // default:
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            // to connect the reviews which are related to the particular product 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


// now we came to know that there is a middleware which run before the model.FindByIdAndDelete.... so if we want to delete the reviews we can make hold on this middle ware and use it for deleting the reviews before is came to delete the product itself

productSchema.post('findOneAndDelete' , async function(product) {
    if(product.reviews.length >0)
    {
        await Review.deleteMany({_id: {$in:product.reviews}})
    }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product 