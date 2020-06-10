const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

// modele reprezentujące tablicy w bazach danych
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Users = require('../models/Users');
// ---
// biblioteki szyfrujące i hashujące
const SimpleCrypto = require("simple-crypto-js").default;
const bcrypt = require("bcrypt");
// ---


/**
 * Generate CCV code for survey
 * @param {number} length 
 */
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/**
 * 
 * @api {post} /dodajankiete Wysyła nowo utworzoną ankiete do DB
 * @apiGroup dodajankiete.js 
 *
 * @apiParam {String} key Key of survey.
 * @apiParam {String} title Title of survey.
 * @apiParam {JSON} data Added survey data.
 * @apiParam {String} session Users session.
 * @apiParam {String} pass Users password.
 * 
 * 
 * @apiSuccess {Object} Status1 of POST method is OK.
 * 
 * @apiError {Object} status2 Not able to create row in table UserSurveys.
 * @apiError {Object} status3 Not able to append keys field.
 * @apiError {Object} status4 Not able to create row in table Survey.
 * @apiError {Object} status5 Row from Users not founded.
 */
router.post('/dodajankiete', function(req, res){
    let key = req.body.key;
    let session = req.body.session;
    let parseSession = session.split('=');;

    let hashPass = new SimpleCrypto(req.body.pass); 
    let hashKey = new SimpleCrypto(key);
    //become object
    let surveyData = JSON.parse(req.body.data);
    //------    
    surveyData["ccv"] = req.app.locals.uniqueCCV;
    let surveyJsonWithCCV = JSON.stringify(surveyData);
    console.log(surveyJsonWithCCV);
    

    let hashedKey = hashPass.encrypt(key) // szyfrowane klucza hasłem 

    let hashSurveyByKey = hashKey.encrypt(surveyJsonWithCCV);
    let hashSurveyByPassword = hashPass.encrypt(surveyJsonWithCCV);
    
    let importccv = makeid(10);
   
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
                    Users.update({
                        hashedKeys : Sequelize.fn('CONCAT', Sequelize.col("hashedKeys"), hashedKey+", "    )
                    }, {where : {
                        login : parseSession[1]
                    }
                    }).then( function(){
                        //console.log("added to table");
                        UserSurveys.create({
                            hashedKey: hashedKey,    
                            data: hashSurveyByPassword,
                            done: '0',
                        }).then(function(){
                            req.app.locals.uniqueCCV = importccv;                           
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


/**
 * @api {post} /addSurveyByKey Dodaje ankiete do użytkownika za pomocą klucza
 * @apiGroup dodajankiete.js 
 *
 * @apiParam {String} key Key of survey.
 * @apiParam {String} pass User password.
 * 
 * 
 * @apiSuccess {Object} status Status of POST method is OK.
 * @apiSuccessExample {json} Created UserSurveys row:
 *    200 OK
 *    {
 *      "hashedKey": "5tEg190520",
 *      "data": "--encrypt survey--",
 *      "done": "0"
 *    }
 * @apiSuccessExample {json} Updated Users row:
 *    200 OK
 *    {
 *      "anotherHashedKeys": "[--1st encrypt key-- , --2nd encrypt key--, .... ]"
 *    }
 * @apiError {Object} status Failed to create UserSurveys row.
 * @apiError {Object} status1 Not able to append keys field.
 * @apiError {Object} status2 Not such survey with given key.
 * @apiError {Object} status3 Not such user with given login.
 */
router.post('/addSurveyByKey', async function(req, res){
   
    Users.findOne({ 
        where : {
            login : req.cookies.login
        }
    }).then( userRecord =>{
        let iscorrect = bcrypt.compareSync(req.body.pass, userRecord.password);  
        if(iscorrect){
            Surveys.findOne({
                where : {
                    key: req.body.key
                },
                attributes: ['name', 'data']
            }).then( surveyByKey=>{
                if(surveyByKey){

                    let hashByKey = new SimpleCrypto(req.body.key);
                    let hashPass = new SimpleCrypto(req.body.pass); 


                    let surveyDataJson = hashByKey.decrypt(surveyByKey.data); //json data
                    let hashKey = hashPass.encrypt(req.body.key);

                    let hashedData = hashPass.encrypt(surveyDataJson);
                    //console.log(surveyDataJson);

                    Users.update({
                        anotherHashedKeys : Sequelize.fn('CONCAT', Sequelize.col("anotherHashedKeys"), hashKey+", "    )
                    }, {where : {
                        login : req.cookies.login
                        }
                    }).then( function(){
                        UserSurveys.create({
                            hashedKey: hashKey,                 // data z ankiety
                            data: hashedData,
                            done: '0',
                        }).then( function(){
                            res.send({status : "ok"});
                        }).catch(err =>{
                            res.send({status: "error"});
                        });
                    }).catch(err =>{
                        res.send({status: "error"});
                    });

                }else{
                    res.send({status: "error"});
                }
            })
        }else{
            res.send({status: "error"});
        }
    }).catch(err =>{
        res.send({status : 'error'});
    })
   
})


module.exports = router;