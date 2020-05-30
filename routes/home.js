const express = require("express");
const router = express.Router();
const SimpleCrypto = require("simple-crypto-js").default;
const Users = require('../models/Users');
const Surveys = require('../models/Surveys');

router.get('/dodajankiete', (req, res) =>{
    // console.log(req.cookies.login);

    res.render('dodajankiete', { user: req.cookies.login});
})



router.get('/mojeankiety', (req, res) =>{

    // TODO need user password
    
    let hashpass = new SimpleCrypto("test4"); // TODO change to pass
    let arrayYourSurveyObj = [];
    let arrayNONEYourSurveyObj = [];
    Users.findOne({
        where: {
            login : req.cookies.login
        },
        attributes : ['hashedKeys', 'anotherHashedKeys']
    }).then(async surveyKeys=>{

        if(!surveyKeys.hashedKeys ){
            arrayYourSurveyObj = ["xd"];
            let addedArraysKeys = surveyKeys.anotherHashedKeys.split(', ');
            for(let i = 0; i < addedArraysKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(addedArraysKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                })
    
                arrayNONEYourSurveyObj.push(surv);
                //console.log(arrayYourSurveyObj+"\n"+surv);
                 // TODO send arrayYourSurveyObj and arrayNONEYourSurveyObj to mojeankiety
            } // for end


        }else
        if(!surveyKeys.anotherHashedKeys){
            arrayNONEYourSurveyObj = ["xd"];
            let arrayKeys = surveyKeys.hashedKeys.split(', ');
            for(let i = 0; i < arrayKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(arrayKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                })
    
                arrayYourSurveyObj.push(surv);
                //console.log(surv+"\n"+arrayNONEYourSurveyObj);
                // TODO send arrayYourSurveyObj and arrayNONEYourSurveyObj to mojeankiety
            } // for end
            
        }
        
        //console.log(arrayYourSurveyObj[0].name+"\n"+arrayNONEYourSurveyObj);
        //res.status(200).send('ok');
        //console.log(arrayYourSurveyObj +"                     "+ arrayNONEYourSurveyObj);


        res.render('mojeankiety', {surveysYour : arrayYourSurveyObj, surveyAnother : arrayNONEYourSurveyObj, user: req.cookies.login});
        // for(let i = 0; i < arrayKeys.length-1; i++){

        //     let unhashedKey = hashpass.decrypt(arrayKeys[i]); // TODO password here
        //     const surv = await Surveys.findOne({
        //         where : {
        //             key: unhashedKey
        //         },
        //         attributes: ['id', 'name'],
        //     })

        //     arrayYourSurveyObj.push(surv);

            

        // } // for end
        
        
    })
    
    //res.render('mojeankiety', { user: req.cookies.login});
})


// const findSurveys = async unhashedKey => {
//     Surveys.findOne({
//         where :{
//             key: unhashedKey
//         },
//         attributes: ['id', 'name'],
        
//     }).then(surveyInfo=>{
        
//         //console.log(arrayObj.length);
//         console.log("FINDONE")

//         return callback(null, surveyInfo);
//     })
// }


module.exports = router;