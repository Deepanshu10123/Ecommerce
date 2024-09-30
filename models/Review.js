const mongoose = require('mongoose')


let reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        min:0,
        max:5,
        required: true,
    },
    comment: {
        type: String,
        trim: true
    }
} , {timestamps:true})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review 