const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/verify',async (req, res)=>{
    try {
        const Token = req.query.id;
    
        const user = await User.findOne({'Token': Token});
        if(!user) {
            req.flash('error', 'No user found');
            res.redirect('login');
        }
        
        user.active = true;
        user.Token = '';
        await user.save();
        var name = user.name
        
        req.flash('success', 'Thanks you!');
        res.render('verify', {name});
    }catch(error){
        next(error);
    }
});

router.post('/verify', async function (req, res, next){
});

module.exports = router;