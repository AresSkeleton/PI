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

    let hashByPass = new SimpleCrypto("test4"); // TODO zmienic na input hasła
    Surveys.findOne({
            where : {
                id : req.params.id
            },
            attributes : ["key", "name"],
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
                                
                                let answObj = JSON.parse(req.body.answers);
                                console.log(answObj);

                                if(ifSurveyExists){
                                    // todo update row
                                }else{
                                    
                                    // Answers.create({

                                    // })
                                }
                            })
                        }    
                    )
                    }
                    
                }
            })
        })

})


router.get('/wynikiankiety/:id', function(req, res){
    
})



module.exports = router;