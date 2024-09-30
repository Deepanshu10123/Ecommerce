const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const app = express();

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart')

mongoose.connect('mongodb://127.0.0.1:27017/shopping-deepanshu-app')
    .then(() => { console.log("Connected to DB"); })
    .catch((err) => { console.error("Error connecting to DB:", err); });

// View engine setup
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configure session middleware before using passport
app.use(session({
    secret: 'keyboard cat', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24 * 7 * 60 * 60 * 1000
    }
}));

// Initialize Passport middleware after express-session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes)

// Seed database (run only once to avoid repetitive seeding)
// seedDB();

// Start server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
