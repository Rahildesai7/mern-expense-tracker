const express = require('express');
const Expense = require('../models/expense.model');
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');

const router = express.Router();

router.post('/add',passport.authenticate('jwt',{session: false}), async(req,res)=>{
    req.body.recurred_by = req.user;
    const expense = new Expense(req.body);
    await expense.save()
            .then(()=>res.json('Expense added:'+ expense))
            .catch((err)=> res.json('Error: '+err));
});

router.get('/add', passport.authenticate('jwt',{session: false}), (req, res)=>{
    res.json('hii');
});

router.get('/by/category/:category',isLoggedIn,(req,res,next)=>{
    res.json(Expense.find({'recorded_by': req.user, 'category': req.params.category}));
});

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/users/login'); 
} 

module.exports = router;