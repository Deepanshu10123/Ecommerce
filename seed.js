const mongoose =require('mongoose')
const Product = require('./models/Product')

const products = [
    {
        name: 'Product 1',
        img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
        price: 10.99,
        desc: 'This is product 1'
    },
    {
        name: 'Product 2',
        img:"https://images.unsplash.com/photo-1556228578-567ba127e37f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
        price: 9.99,
        desc: 'This is product 2'
    },
    {
        name: 'Product 3',
        img:"https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        price: 8.99,
        desc: 'This is product 3'
    },
    {
        name: 'Product 4',
        img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        price: 7.99,
        desc: 'This is product 4'
    },
    {
        name: 'Product 5',
        img:"https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
        price: 6.99,
        desc: 'This is product 5'
    }
]

async function seedDB(){
    await Product.insertMany(products)
    console.log('DB seeded successfully')
}

module.exports = seedDB