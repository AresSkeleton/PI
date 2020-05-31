const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');


router.get('/', function(req, res) {
        // res.cookie('chuj', 'miWdupe');
        
        if(!req.cookies.login){
            res.render('login', {
            // users : allFromusers,
            });
        }else{
            res.redirect('home');
        }
});


router.get('/register', function(req, res) {
    if(!req.cookies.login){
        res.render('register', {
        // users : allFromusers,
        });
    }else{
        // res.render('home')
        res.redirect('home');
    }
});


router.post('/home', async function(req, res){
        Users.findOne({
            where: {
                login : req.body.login, 
                }
            }).then( userRow =>{
                // console.log(userRow);
                // let iscorrect = bcrypt.compare(req.body.password, userRow.password, function(err, result) {
                //     if (err) { throw (err); }
                //     console.log(result);
                // });
                let iscorrect = bcrypt.compareSync(req.body.password, userRow.password);
                res.cookie('login', req.body.login);
                res.send( {iscorrect: iscorrect} );
            
        });
});


router.get('/home', function( req, res){
    // console.log( req.cookies.login);
    // поля будут обновлены со временем
    if(req.cookies.login){
        Users.findOne({
            where: {
                login: req.cookies.login
            },
            attributes: ['id', 'login']
        }).then( userSession =>{
            res.render('home', {user: userSession});
        }).catch( err =>{
            res.send( err);
        });
    }else{
        res.redirect('/');
    }
})

// async function compareTwoHashPass(password, rowPass){
//     try{
//         console.log(rowPass +' 1-----1 ' + password);
//         if (await bcrypt.compare(password, rowPass)) {
//             console.log('true');
//             return Promise.resolve(true);
//         } else{
//             console.log('false');
//             return Promise.resolve(false);
//         }
//     } catch(err){
//         console.log('elo error mordo');
//         return Promise.resolve(err);
//     }
// }

module.exports = router;