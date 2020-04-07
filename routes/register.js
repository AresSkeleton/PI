const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require('../models/Users');




router.post('/register', async function(req, res){
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        // console.log(hashedPass);
        // console.log(req.body.login);
        return Users.create({
            login: req.body.login,
            password: hashedPass
        }, {raw: true}).then( newUser =>{
            // console.log(newUser);
            // res.redirect('', {
            //     user: newUser
            // });
        }).catch(e =>{
            res.send({status: 'error' });
        });
        
    }catch{
        res.render('register');
    }
    
});


module.exports = router;