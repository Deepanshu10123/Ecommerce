const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();  


// to show the signup form of signup
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

// actually want to register the user in db
router.post('/register',async(req,res)=>{
    try{
    let {email, password,username, role}= req.body
    const user = new User({email,username,role}) 
    const newUser = await User.register(user,password)
    // res.redirect('/login')
    req.login(newUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash('success','Welcome, You are registed succesfully!')
        return res.redirect('/products')
    }) 
    }catch(e){
        req.flash('error',e.message)
        return res.redirect('./register')
    }
})


// to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})
// to actually login by checking the user present in user DB
router.post('/login',
    passport.authenticate('local', {   
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req, res)=> {
        req.flash('success','Welcome back'),
        res.redirect('/products');
});


// logout karna h ab
router.get('/logout', (req, res) => {
    ()=>{
        req.logout()
    }
    req.flash('success', 'Goodbye friend!! See you again!!');
    res.redirect('/login');
});

module.exports = router