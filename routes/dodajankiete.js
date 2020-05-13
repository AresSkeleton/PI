const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Users = require('../models/Users');
const SimpleCrypto = require("simple-crypto-js").default;
const bcrypt = require("bcrypt");

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
                UserSurveys.create({
                    hashedKey: hashKey,
                    data: req.body.data,
                    done: '0',
                }).catch(e =>{
                    res.send({status : 'error'})
                });
            }).catch( e =>{
                res.send({status : 'error'})
            });
        
    }).catch( e =>{
        res.send({status : 'error'})
    });


});


router.post('/addSurveyByKey', async function(req, res){
    //console.log(req.body.key+ " " + req.body.pass);
    
    Users.findOne({ 
        where : {
            login : req.cookies.login
        }
    }).then( userRecord =>{
        let iscorrect = bcrypt.compareSync(req.body.pass, userRecord.password);  // TODO: change compare function to in if(pass1 == pass2)
        if(iscorrect){
            console.log('11111111111111111111111111111111');
            Surveys.findOne({
                where : {
                    key: req.body.key
                },
                attributes: ['name']
            }).then( surveyByKey=>{
                if(surveyByKey){
                    let hashPass = new SimpleCrypto(req.body.pass); 
                    let hashKey = hashPass.encrypt(req.body.key)
                    Users.update({
                        hashedKeys : Sequelize.fn('CONCAT', Sequelize.col("hashedKeys"), hashKey+", "    )
                    }, {where : {
                        login : req.cookies.login
                        }
                    }).then( function(){
                        res.send(200).json({status: "ok"});
                        
                    }).catch(err =>{
                        res.send(400).json({status: "server error"})
                    })
                }else{
                    res.send(400).json({status : "dont find survey by key"});
                }
            })
        }else{
            // console.log('2222222222222222222222222');
            res.send(400).json({status : "false password"});
        }
    }).catch(err =>{
        res.send({status : 'error'});
    })
   
})


module.exports = router;