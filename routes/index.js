const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
        // res.cookie('chuj', 'miWdupe');
        res.render('login', {
            // users : allFromusers,
        });
        // res.send(allFromusers);
});


router.get('/register', function(req, res) {
    res.render('register',{ });
});


router.post('/home', async function(req, res){
    try{
        const hashedInsertPass = await bcrypt.hash(req.body.password, 10);
        return Users.findOne({
            where: {
                login : req.body.login, 
                }
            }).then( userRow =>{
                console.log(userRow.password +' ----- ' + req.body.password);
               
                console.log(userRow.password +' ----- ' + hashedInsertPass);
                // let iscorrect = bcrypt.compare(req.body.password, userRow.password, function(err, result) {
                //     if (err) { throw (err); }
                //     console.log(result);
                // });
                let iscorrect = bcrypt.compareSync(req.body.password, userRow.password);
                console.log('-----------');
                console.log(iscorrect);
                console.log('-----------');

            
        });
    } catch(er){

    }
});

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