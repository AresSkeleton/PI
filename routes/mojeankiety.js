const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Answers = require('../models/Answers');
const SimpleCrypto = require("simple-crypto-js").default;

/**
 * @api {get} /zaladujankiete/:id Wyświetla strone z możliwościa wypełnienia ankiety o konkretnym id
 * @apiGroup mojeankiety.js
 *
 * 
 * @apiParam {Number} id Username id from Users table.
 * 
 * @apiSuccess {Page} Page Render /zaladujankiete with parameters "data" and "user".
 * 
 * 
 * @apiError {Object} status Not such survey with given id.
 */
router.get('/zaladujankiete/:id', function(req, res){
    //res.send(req.params.id);
    Surveys.findOne({
        where: {
            id: req.params.id
        }
    }).then( surveyRow =>{
        let survKey = new SimpleCrypto(surveyRow.key);
        let unhashedData = survKey.decrypt(surveyRow.data);
        let dataObj = JSON.parse(unhashedData);

       // console.log(dataObj);

        delete dataObj["ccv"];
        //console.log(dataObj);
        //dataJson = JSON.stringify(dataObj);

        res.render('zaladujankiete', {data : dataObj, user : req.cookies.login});

    }).catch(err =>{
        res.send({status : "error"});
    });
});


/**
 * @api {post} /sendSurvey/:id Wysyła do bazy danych informacje o wypełniniej ankiecie
 * @apiGroup mojeankiety.js
 *
 * @apiParam {Json} answers Json of survey with input data.
 * @apiParam {Number} id Id of survey in Surveys table.
 * 
 * 
 * @apiSuccess {Object} status Status of POST method is OK, if row was edit correctly.
 * @apiSuccess {Object} status1 Status of POST method is Created, if row was created succesfully.
 * @apiSuccessExample {Json} Update UserSurveys row:
 *    200 OK
 *    {
 *      "done": "2"
 *    }
 * @apiSuccessExample {Json} Append "data" parameter in Answers table:
 *    200 OK
 *    {
 *      "data": "--some new inputs --",
 *    }
 * @apiSuccessExample {Json} Create Answers row:
 *    200 OK
 *    {
 *      "key" : "5tEg190520",
        "name" : "testowy",
        "data" : "--some encrypted data--"
 *    }
 * 
 * @apiError {Object} status Not able to update row in table Answers.
 * @apiError {Object} status1 Not able to find row with given key in Answers table.
 * 
 * @apiError {Object} status2 Not able to create row in table Answers.
 * @apiError {Object} status3 Row from Users not founded.
 * @apiError {Object} status4 Not able to find row with dehashed key.
 * @apiError {Object} status5 Not able to update status of row in UserSurveys table.
 * @apiError {Object} status6 Not able to find all rows in UserSurveys table.
 */
router.post('/sendSurvey/:id', function(req, res){
    let hashByPass = new SimpleCrypto("test2"); // TODO zmienic na input hasła
    Surveys.findOne({
            where : {
                id : req.params.id
            },
            attributes : ["key", "name", "data"],
            raw: true
        }).then( syrveyKey =>{
            UserSurveys.findAll({
                attributes : ["hashedKey"],
                raw :true
            } ).then( allHashedKeyfromUS=>{
                for(let i = 0; i < allHashedKeyfromUS.length; i++){
                    let decryptkey = hashByPass.decrypt(allHashedKeyfromUS[i].hashedKey);

                    if(syrveyKey.key == decryptkey){
                        UserSurveys.update({
                            done : "2",
                        }, {
                            where : {
                                hashedKey : allHashedKeyfromUS[i].hashedKey
                            }
                        }).then( function(){
                            Answers.findOne({
                                where : {
                                    key : decryptkey
                                }, raw : true
                            }).then( ifSurveyExists =>{
                                let answObj = JSON.parse(req.body.answers);
                                let hashByKey = new SimpleCrypto(syrveyKey.key);
                                let decryptedData = hashByKey.decrypt(syrveyKey.data);
                                decryptedData = JSON.parse(decryptedData);
                                let ccv = decryptedData["ccv"];
                                let hashedByCCV = new SimpleCrypto(ccv);
                                if(ifSurveyExists){
                                    // todo update row
                                    Answers.findOne({
                                        where: {
                                            key : syrveyKey.key
                                        },
                                        attributes : ["data"], 
                                        raw :true
                                    }).then( rowToAppend =>{
                                        let rowToAppendData = hashedByCCV.decrypt(rowToAppend.data);
                                        rowToAppendData = JSON.parse(rowToAppendData); //---------------------------objToAppend
                                        //console.log(rowToAppendData);

                                        for(let i = 1; i < Object.keys(rowToAppendData).length; i++){
                                            // console.log(i);
                                            let question = rowToAppendData["EntireQuestionNo"+i];
                                            if(question["type"] == "r"){
                                                let temp = answObj["EntireQuestionNo"+i]["input"][0];
                                                question["input"].push(temp);
                                               
                                        
                                            }
                                            if(question["type"] == "c"){
                                                let temp = answObj["EntireQuestionNo"+i]["input"];
                                                question["input"].push(temp);
                                            }
                                            if(question["type"] == "t"){
                                                let temp = answObj["EntireQuestionNo"+i]["input"];
                                                for( let j = 0; j < temp.length; j++){
                                                    question["input"].push(temp[j]);
                                                }
                                            }
                                        
                                             
                                        }
                                        // console.log("----------------------------------dsadsadasdsadsa");
                                        // console.log(rowToAppendData);

                                        rowToAppendData = JSON.stringify(rowToAppendData)
                                        let EncRowToAppend = hashedByCCV.encrypt(rowToAppendData);
                                        // console.log("Zmienilo wierz w Answers ");

                                        Answers.update({
                                            data : EncRowToAppend
                                        }, { where: {
                                            key : syrveyKey.key
                                        }
                                        }).then( function(){
                                            res.send({ status : "ok"});
                                        }).catch(err =>{
                                            res.send({ status : "error"});
                                        })
                                        
                                    }).catch(err =>{
                                        res.send({ status : "error"});
                                    });
                                }else{
                                    // console.log(req.body.answers);
                                    // console.log("-----------------------")
                                    let encryptedData = hashedByCCV.encrypt(req.body.answers);                                  
                                    Answers.create({
                                        key : decryptkey,
                                        name : syrveyKey.name,
                                        data : encryptedData
                                    }).then( newRow =>{
                                        // console.log("zapisało do Answers nowy wierz");
                                        // console.log(newRow);
                                        res.send({status : "created"});
                                    }).catch(err=>{
                                        rres.send({ status : "error"});
                                    })
                                    
                                }
                            }).catch(err =>{
                                res.send({ status : "error"});
                            });
                        }).catch(err =>{
                            res.send({ status : "error"});
                        })
                    }
                    
                }
            }).catch(err =>{
                res.send({ status : "error"});
            })
        }).catch(err =>{
            res.send({ status : "error"});
        });

});

/**
 * @api {get} /wynikiankiety/:id/:usccv Pokazuje wyniki konkretnej ankiety
 * @apiGroup mojeankiety.js 
 *
 * 
 * @apiParam {Number} id Id from Users table.
 * @apiParam {String} usccv Code CCV.
 * 
 * @apiSuccess {Page} Page Render /wynikiankiety/:id/:usccv with [id, usccv, survey, user] parameters.
 * 
 * 
 * @apiError {String} status Bad CCV code.
 * @apiError {Object} status1 Not such survey with given id.
 */
router.get('/wynikiankiety/:id/:usccv', function(req, res){
    let hashedByCCV = new SimpleCrypto(req.params.usccv); //todo input z ccv

    Surveys.findOne({
        where : {
            id: req.params.id
        },
        attributes : ["key"],
        raw : true
    }).then( keyOfSurvey =>{
        Answers.findOne({
            where : {
                key : keyOfSurvey.key
            },
            attributes : ["data"],
            raw : true
        }).then( showAnswersRow =>{
            let sss = showAnswersRow.data;
            console.log("--------------------");
            console.log(sss);
            let answersRow = hashedByCCV.decrypt(showAnswersRow.data);
            console.log("--------------------");
            console.log(answersRow);
            
            res.render('wynikiAnkiety', {survey : answersRow, user : req.cookies.login});
        }).catch(err=>{
            res.send("Nikt jeszcze nie wypełnił towjej ankiety");
            
        });
    }).catch(err=>{
        res.send({status: "error"});
    });
});



module.exports = router;