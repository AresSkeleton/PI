const express = require("express");
const router = express.Router();
const Users = require('../models/Users');



router.get('/user', function(req, res) {
    
    //Users.findAll({
      //  raw: true
    //}).then(allFromusers =>{ 
        // console.log(1233213123213);       
        res.render('user', {
            //users : allFromusers,
        });
        // res.send(allFromusers);
    // }).catch(err =>{
    //     console.log(err);
    // })
});

module.exports = router;