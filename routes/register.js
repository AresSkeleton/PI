const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require('../models/Users');


/**
 * @api {post} /register Dodawanie użytkownika do bazy danych
 * @apiGroup register.js
 *
 * 
 * @apiParam {String} login Username login.
 * @apiParam {String} password Username password.
 * 
 * @apiSuccess {Object} status Send to page object with parameter status.
 * @apiSuccessExample {Json} Create User row:
 *    200 OK
 *    {
 *      "login" : "testowy2"
 *      "password": "$2b$10$v9BsrpDLlpA9uQvpMocydO90uOJX3PQ/tvBbxyMsSU7TgVwBaNgVu"
 *      "hashedKeys": ""
 *      "anotherHashedKeys": ""
 *    }
 * 
 * @apiError {Object} status Not able to create row in Users table.
 * @apiError {Object} status1 Cannot hash password.
 * 
 */
router.post('/register', async function(req, res){
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        return Users.create({
            login: req.body.login,
            password: hashedPass,
            hashedKeys : "",
            anotherHashedKeys: ""
        }, {raw: true
        }).then( newUser =>{
            res.send({status : "created"});
        }).catch(e =>{
            res.send({status: 'error' });
        });
        
    }catch{
        res.render('register');
    }
    
});


module.exports = router;