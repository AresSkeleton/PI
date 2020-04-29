const express = require("express");
const router = express.Router();
const Users = require('../models/Users');


router.get('/dodajankiete', (req, res) =>{
    // console.log(req.cookies.login);
    res.render('dodajankiete', { user: req.cookies.login});
})




module.exports = router;