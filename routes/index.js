const express = require("express");
const router = express.Router();
const Users = require('../models/Users');

router.get('/', function(req, res) {
    Users.findAll({
        raw: true
    }).then(allFromusers =>{
        // console.log(allFromusers);
        
        res.render('index', {
            users : allFromusers
        });
        // res.send(allFromusers);
    }).catch(err =>{
        console.log(err);
    })
});

module.exports = router;