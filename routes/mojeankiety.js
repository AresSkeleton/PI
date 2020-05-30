const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const Surveys = require('../models/Surveys');
const UserSurveys = require('../models/UserSurveys');
const Answers = require('../models/Answers');
const SimpleCrypto = require("simple-crypto-js").default;

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
        res.send(err);
    });
});


router.post('/sendSurvey/:id', function(req, res){
    // console.log("Jestem backend");
    // console.log(req.params.id);

    let hashByPass = new SimpleCrypto("test2"); // TODO zmienic na input hasła
    Surveys.findOne({
            where : {
                id : req.params.id
            },
            attributes : ["key", "name", "data"],
            raw: true
        }).then( syrveyKey =>{
            //console.log(syrveyKey);
            UserSurveys.findAll({
                attributes : ["hashedKey"],
                raw :true
            } ).then( allHashedKeyfromUS=>{
                //console.log(allHashedKeyfromUS);

                //let arrayOfhashedKeys = [];
                //console.log(allHashedKeyfromUS);
                for(let i = 0; i < allHashedKeyfromUS.length; i++){
                    //console.log(i+"   ------------------------- ilosc elementow");
                    //console.log(allHashedKeyfromUS[i].hashedKey);
                    let decryptkey = hashByPass.decrypt(allHashedKeyfromUS[i].hashedKey);
                    //console.log(" decrypt key ------- "+ decryptkey);

                    if(syrveyKey.key == decryptkey){
                        //console.log("zapraszam");
                        UserSurveys.update({
                            done : "2",
                        }, {
                            where : {
                                hashedKey : allHashedKeyfromUS[i].hashedKey
                            }
                        }).then( function(){

                            // TODO utworzyc nową tabelę w db 
                            Answers.findOne({
                                where : {
                                    key : decryptkey
                                }, raw : true
                            }).then( ifSurveyExists =>{
                                // console.log(typeof(ifSurveyExists));
                                // console.log(ifSurveyExists);

                                let answObj = JSON.parse(req.body.answers); //----------------------------------------- obj
                                //console.log(answObj);


                                let hashByKey = new SimpleCrypto(syrveyKey.key);
                                let decryptedData = hashByKey.decrypt(syrveyKey.data);
                                //console.log(decryptedData);
                                decryptedData = JSON.parse(decryptedData);
                                //console.log(decryptedData);
                                
                                let ccv = decryptedData["ccv"];
                                //console.log(ccv);
                                let hashedByCCV = new SimpleCrypto(ccv);
                                console.log(ccv);
                                console.log("--------------------------------");

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
                                        console.log(rowToAppendData);

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
                                        console.log("----------------------------------dsadsadasdsadsa");
                                        console.log(rowToAppendData);

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
                                            res.send(err);
                                        })
                                        
                                    }).catch(err =>{
                                        res.send(err);
                                    });
                                }else{
                                    console.log(req.body.answers);
                                    console.log("-----------------------")
                                    let encryptedData = hashedByCCV.encrypt(req.body.answers);                                  
                                    Answers.create({
                                        key : decryptkey,
                                        name : syrveyKey.name,
                                        data : encryptedData
                                    }).then( newRow =>{
                                        console.log("zapisało do Answers nowy wierz");
                                        console.log(newRow);
                                        res.send({status : "created"});
                                    }).catch(err=>{
                                        res.send(err);
                                    })
                                    
                                }
                            }).catch(err =>{
                                res.send(err);
                            });
                        }).catch(err =>{
                            res.send(err);
                        })
                    }
                    
                }
            }).catch(err =>{
                res.send(err);
            })
        }).catch(err =>{
            res.send(err);
        });

});


router.get('/wynikiankiety/:id', function(req, res){
    let hashedByCCV = new SimpleCrypto("68FoP3RTyx"); //todo input z ccv

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
            //let sss = showAnswersRow.data;
            let answersRow = hashedByCCV.decrypt(showAnswersRow.data);
            console.log("--------------------");
            console.log(answersRow);

            res.render('wynikiAnkiety', {survey : answersRow, user : req.cookies.login});
        }).catch(err=>{
            res.send(err);
        });
    }).catch(err=>{
        res.send(err);
    });
});



module.exports = router;