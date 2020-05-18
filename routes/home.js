const express = require("express");
const router = express.Router();
const SimpleCrypto = require("simple-crypto-js").default;
const Users = require('../models/Users');
const Surveys = require('../models/Surveys');

router.get('/dodajankiete', (req, res) =>{
    // console.log(req.cookies.login);
    res.render('dodajankiete', { user: req.cookies.login});
})



router.get('/mojeankiety', async(req, res) =>{

    // TODO need user password
    let hashpass = new SimpleCrypto("password"); // change to pass
    let arrayObj = [];
    Users.findOne({
        where: {
            login : req.cookies.login
        },
        attributes : ['hashedKeys']
    }).then(async surveyKeys=>{
        
        let arrayKeys = surveyKeys.hashedKeys.split(', ');
        for(let i = 0; i < arrayKeys.length-1; i++){

            let unhashedKey = hashpass.decrypt(arrayKeys[i]); // password here


            // Surveys.findOne({
            //             where :{
            //                 key: unhashedKey
            //             },
            //             attributes: ['id', 'name'],
                        
            //         }).then(surveyInfo=>{
                        
            //             arrayObj.push(surveyInfo);
            //             //console.log(arrayObj.length);
            //             //console.log("FINDONE")
                        
            //             //res.render('mojeankiety', { user: req.cookies.login, usersurveys : arrayObj});
            //         })


            // findSurveys(unhashedKey).then(err ,foundSurvey =>{
            //     arrayObj.push(foundSurvey);
                
            //     //console.log(arrayObj.length);
            // })
            const surv = await Surveys.findOne({
                where : {
                    key: unhashedKey
                },
                attributes: ['id', 'name'],
            })

            arrayObj.push(surv);

            

        } // for end
        
        console.log(arrayObj.length+"co kurwa");
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