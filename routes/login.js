const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get('/register', function(req, res) {
    res.render('register',{ });
});

router.post('/register', async function(req, res){
    try{
        const hashedPass = await bcrypt.hash(req.body.passwordInput);
        
    }catch{

    }
    console.log(req.body.passwordInput);
});


module.exports = router;