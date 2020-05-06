const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Users = require('../models/Users');
const SimpleCrypto = require("simple-crypto-js").default;


router.post('/dodajankiete', function(req, res){
    //console.log('Post Survey data--------------------------');
    // console.log(req.body.key);
    let key = req.body.key;
    let session = req.body.session
    let parseSession = session.split('=');
    // console.log();
    let hashPass = new SimpleCrypto("password");
    let hashKey = hashPass.encrypt(key)

    Surveys.create({
        key: key,
        name : req.body.title,
        data : req.body.data,
    }, {raw : true}).then( newSurvey  =>{
        //console.log('Sended');
        // console.log(newSurvey);
        //res.send({status: 'Ok'});
            Users.update({
                hashedKeys : Sequelize.fn('CONCAT', Sequelize.col("hashedKeys"), hashKey+", "    )
            }, {where : {
                login : parseSession[1]
            }
            }).then( function(){
                //console.log("added to table");
                // UserSurveys.create({

                // })


            }).catch( e =>{
                res.send({status : 'error'})
            });
        
    }).catch( e =>{
        res.send({status : 'error'})
    });


});


module.exports = router;