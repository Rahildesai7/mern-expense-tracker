const express = require('express');
const User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
//const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

const router = express.Router();

router.get('/',isLoggedIn,(res,req,next)=>{
    res.json('Hello World');
});

router.post('/add', async(req,res)=>{
    var salt = bcrypt.genSaltSync(10);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    }
    const newUser = new User(user);
    await newUser.save()
    .then(()=>res.json('User added'))
    .catch(err => res.status(400).json('Error: '+err));

});

router.post('/login', passport.authenticate("local", { 
    successRedirect: "/users", 
    failureRedirect: "/users/login"
}), function (req, res) { 
}); 
  
//Handling user logout  
router.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/users"); 
}); 
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/users/login'); 
} 

module.exports = router;