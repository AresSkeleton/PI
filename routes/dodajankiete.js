const express = require("express");
const router = express.Router();
const Surveys = require('../models/Surveys');


router.post('/dodajankiete', function(req, res){
    console.log('Post Survey data--------------------------');
    // console.log(req.body.key);


    Surveys.create({
        key: req.body.key,
        name : req.body.title,
        data : req.body.data,
    }, {raw : true}).then( newSurvey  =>{
        console.log('Sended');
        // console.log(newSurvey);
        res.send({status: 'Ok'});

    }).catch( e =>{
        res.send({status : 'error'})
    });
});


module.exports = router;