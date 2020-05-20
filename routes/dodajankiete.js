const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Users = require('../models/Users');
const SimpleCrypto = require("simple-crypto-js").default;
const bcrypt = require("bcrypt");

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


router.post('/dodajankiete', function(req, res){
    //console.log('Post Survey data--------------------------');
    // console.log(req.body.key);
    let key = req.body.key;
    let session = req.body.session;
    let parseSession = session.split('=');;

    let hashPass = new SimpleCrypto(req.body.pass); 
    let hashKey = new SimpleCrypto(key);
    


    //TODO - not usefull in this js--------------------
    //let surveyDataDeleteCVV = JSON.parse(req.body.data);
    //delete surveyDataDeleteCVV["ccv"];
    //let surveyJsonWithoutCCV = JSON.stringify(surveyDataDeleteCVV);
    // let hashSurveyByKey = hashKey.encrypt(surveyJsonWithoutCCV);
    //-------------------------------------------
    
    
    //become object
    let surveyData = JSON.parse(req.body.data);
    //------

    // console.log("---------------------------");
    // console.log(surveyData);
    // console.log("---------------------------");

    
    surveyData["ccv"] = req.app.locals.uniqueCCV;
    
    // console.log(surveyData["ccv"]+" -------------------------------------------- ccv in survey");


    // console.log("------------------------with ccv--------------------------");
    // console.log(surveyData);


    // console.log("------------------------without ccv--------------------------");
    // console.log(surveyDataDeleteCVV);

    let surveyJsonWithCCV = JSON.stringify(surveyData);
    

    let hashedKey = hashPass.encrypt(key) // szyfrowane klucza hasłem 

    let hashSurveyByKey = hashKey.encrypt(surveyJsonWithCCV);
    let hashSurveyByPassword = hashPass.encrypt(surveyJsonWithCCV);
    
    let importccv = makeid(10);
    //console.log(req.app.locals.status);
   
    Users.findOne({
        where : {
            login : req.cookies.login
        }
    }).then( userRecord =>{

        let comparePass = bcrypt.compareSync(req.body.pass, userRecord.password);

        if(comparePass){
                Surveys.create({
                key: key,
                name : req.body.title,
                data : hashSurveyByKey,
            }, {raw : true}).then( newSurvey  =>{
                //console.log('Sended');
                // console.log(newSurvey);
                //res.send({status: 'Ok'});
                    Users.update({
                        hashedKeys : Sequelize.fn('CONCAT', Sequelize.col("hashedKeys"), hashedKey+", "    )
                    }, {where : {
                        login : parseSession[1]
                    }
                    }).then( function(){
                        //console.log("added to table");
                        UserSurveys.create({
                            hashedKey: hashedKey,    //zmienic sposób szyfrowania (nie pamietam czym, Klaku pajac kurde)
                            data: hashSurveyByPassword,
                            done: '0',
                        }).then(function(){
                            // console.log("----------------------------");
                            // console.log(req.app.locals.uniqueCCV); 
                            // console.log("---------------------------- old");
                            req.app.locals.uniqueCCV = importccv;
                            // console.log("----------------------------");
                            // console.log(req.app.locals.uniqueCCV);
                            // console.log("---------------------------- new" );
                            
                            res.send({status : "ok"});
                        }).catch(e =>{
                            res.send({status : 'error'});
                        });
                    }).catch( e =>{
                        res.send({status : 'error'});
                    });
                
            }).catch( e =>{
                res.send({status : 'error'});
            });
        }else{
            res.send({status: "error"});
        }
    })

        

    

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
                        AnotherHashedKeys : Sequelize.fn('CONCAT', Sequelize.col("AnotherHashedKeys"), hashKey+", "    )
                    }, {where : {
                        login : req.cookies.login
                        }
                    }).then( function(){
                        res.send({status: "ok"});
                        
                    }).catch(err =>{
                        res.send({status: "error"});
                    })
                }else{
                    res.send({status: "error"});
                }
            })
        }else{
            // console.log('2222222222222222222222222');
            res.send({status: "error"});
        }
    }).catch(err =>{
        res.send({status : 'error'});
    })
   
})


module.exports = router;