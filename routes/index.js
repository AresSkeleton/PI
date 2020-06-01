const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

/**
 * @api {get} /index przekierowóje na strone loginowania albo na strone /home, w zalezności od sesji
 * @apiGroup index.js
 *
 * 
 * 
 * @apiSuccess {Page} Page If session is not exist render /login page.
 * @apiSuccess {Page} Page1 If session is exist redirect to /home page.
 * 
 */
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

/**
 * @api {get} /register przekierowóje na strone rejestracji albo na strone /home, w zalezności od sesji
 * @apiGroup index.js
 *
 * 
 * 
 * @apiSuccess {Page} Page If session is not exist render /register page.
 * @apiSuccess {Page} Page1 If session is exist redirect to /home page.
 * 
 */
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


/**
 * @api {post} /home Porównuje hasło
 * @apiGroup index.js
 *
 * 
 * @apiParam {String} login Username login.
 * @apiParam {String} password Username password.
 * 
 * @apiSuccess {Object} status Send to page parameter iscorrect.
 * 
 */
router.post('/home', async function(req, res){
        Users.findOne({
            where: {
                login : req.body.login, 
                }
            }).then( userRow =>{
                let iscorrect = bcrypt.compareSync(req.body.password, userRow.password);
                res.cookie('login', req.body.login);
                res.send( {iscorrect: iscorrect} );
            
        });
});


/**
 * @api {get} /home Wyswietla głowną stronę dla zalogowanych użytkowników 
 * @apiGroup index.js
 *
 * 
 * 
 * @apiSuccess {Page} Page If session is not exist render /index page.
 * @apiSuccess {Page} Page If session is exist redirect to /home page with "user" parameter.
 * 
 * @apiError {Object} status Failed to find Users row.
 */
router.get('/home', function( req, res){
    if(req.cookies.login){
        Users.findOne({
            where: {
                login: req.cookies.login
            },
            attributes: ['id', 'login']
        }).then( userSession =>{
            res.render('home', {user: userSession});
        }).catch( err =>{
            res.send( {status : "error"});
        });
    }else{
        res.redirect('/');
    }
})


module.exports = router;