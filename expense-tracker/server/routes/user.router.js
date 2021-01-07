const express = require('express');
const User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const signToken = userID =>{
  return JWT.sign({
      iss : "Rahil",
      sub : userID
  },"devRahil",{expiresIn : "1h"});
}

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

/* router.post('/login', passport.authenticate('local.login', {
  //successRedirect: 'http://localhost:3000/users',
  failureRedirect: 'http://localhost:3000/users/login',
  //failureFlash: true
}), function (req, res, next) {
    return res.json('Success');
});
 */

router.post('/login', passport.authenticate('local.login',{session: false}), (req, res)=>{
  if(req.isAuthenticated()){
    const {_id, email} = req.user;
    const token = signToken(_id);
    res.cookie("access_token ",token,{httpOnly: true, sameSite:true}); 
    res.status(200).json({isAuthenticated : true, user : email});
  }
});
    
router.get('/logout', (req, res)=>{
  req.logout();
  res.clearCookie("access_token");
  res.status(200).json('logged out')
  //res.redirect('/users');
});

/* router.get("/logout", passport.authenticate('jwt',{session: false}), (req, res) => { 
  res.clearCookie("access_token");
  req.logout();
  res.json({user: {email:""}, success:true}); 
  //res.redirect("/users"); 
});  */
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/users/login'); 
} 

module.exports = router;