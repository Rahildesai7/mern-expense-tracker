const express = require('express');
const Expense = require('../models/expense.model');

const router = express.Router();

router.post('/add',async(req,res)=>{
    req.body.recurred_by = req.user;
    const expense = new Expense(req.body);
    await expense.save()
            .then(()=>res.json('Expense added:'+ expense))
            .catch((err)=> res.json('Error: '+err));
})

router.get('/by/category/:category',isLoggedIn,(req,res,next)=>{
    res.json(Expense.find({'recorded_by': req.user, 'category': req.params.category}));
});

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/users/login'); 
} 

module.exports = router;