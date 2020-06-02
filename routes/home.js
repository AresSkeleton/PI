const express = require("express");
const router = express.Router();
const SimpleCrypto = require("simple-crypto-js").default;
const Users = require('../models/Users');
const Surveys = require('../models/Surveys');




/**
 * @api {get} /dodajankiete Generuje strone 'dodajankiete'
 * @apiGroup home.js
 *
 * @apiParam {String} login User login.
 * 
 * 
 * @apiSuccess {Page} Page Render /dodajankiete page.
 * 
 */
router.get('/dodajankiete', (req, res) =>{
    // console.log(req.cookies.login);

    res.render('dodajankiete', { user: req.cookies.login});
})


/**
 * @api {get} /mojeankiety/:uspass Wyswietla strone 'mojeankiety', gdzie można wypełniać dodane ankiety oraz zobaczyć wyniki swoich ankiet
 * @apiGroup home.js
 *
 * @apiParam {String} uspass User password.
 * 
 * 
 * @apiSuccess {Page} Page Render /mojeankiety/:uspass.
 * 
 */
router.get('/mojeankiety/:uspass', (req, res) =>{

    // TODO need user password
    
    let hashpass = new SimpleCrypto(req.params.uspass); // TODO change to pass
    let arrayYourSurveyObj = [];
    let arrayNONEYourSurveyObj = [];
    Users.findOne({
        where: {
            login : req.cookies.login
        },
        attributes : ['hashedKeys', 'anotherHashedKeys']
    }).then(async surveyKeys=>{

        if(!surveyKeys.hashedKeys && surveyKeys.anotherHashedKeys){
            arrayYourSurveyObj = ["xd"];
            let addedArraysKeys = surveyKeys.anotherHashedKeys.split(', ');
            for(let i = 0; i < addedArraysKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(addedArraysKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                    raw: true
                })
    
                arrayNONEYourSurveyObj.push(surv);
            } // for end


        }
        if(!surveyKeys.anotherHashedKeys && surveyKeys.hashedKeys){
            arrayNONEYourSurveyObj = ["xd"];
            let arrayKeys = surveyKeys.hashedKeys.split(', ');
            for(let i = 0; i < arrayKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(arrayKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                    raw: true
                })
                console.log(surv.id+" "+surv.name);
                arrayYourSurveyObj.push(surv);
            } // for end
            
        }
        if(surveyKeys.hashedKeys && surveyKeys.anotherHashedKeys){
            let addedArraysKeys = surveyKeys.anotherHashedKeys.split(', ');
            for(let i = 0; i < addedArraysKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(addedArraysKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                    raw: true
                })
    
                arrayNONEYourSurveyObj.push(surv);
            } // for end
            let arrayKeys = surveyKeys.hashedKeys.split(', ');
            for(let i = 0; i < arrayKeys.length-1; i++){

                let unhashedKey = hashpass.decrypt(arrayKeys[i]); // TODO password here
                const surv = await Surveys.findOne({
                    where : {
                        key: unhashedKey
                    },
                    attributes: ['id', 'name'],
                    raw: true
                })
                console.log(surv.id+" "+surv.name);
                arrayYourSurveyObj.push(surv);
            } // for end

        }if(!surveyKeys.hashedKeys && !surveyKeys.anotherHashedKeys){
            arrayNONEYourSurveyObj  = ["xd"];
            arrayYourSurveyObj = ["xd"];
            console.log("nie ma żadnego");
            
        }
        console.log(arrayYourSurveyObj+'\n'+arrayNONEYourSurveyObj);
        res.render('mojeankiety', {surveysYour : arrayYourSurveyObj, surveyAnother : arrayNONEYourSurveyObj, user: req.cookies.login});
       
        
    })
    
})



module.exports = router;