const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require('./config/database');

const app = express();
const port = 1337;
var cookieParser = require('cookie-parser')

const routerIndex = require('./routes/index');
const routerRegister = require('./routes/register');
const routerHome = require('./routes/home');
const routerSurvey = require('./routes/dodajankiete');
const routerShow = require('./routes/mojeankiety');

app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.locals.moment = require('moment');
app.locals.status = null;
app.locals.uniqueCCV = makeid(10);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));



db.authenticate().then(() =>{
    console.log('database connected')
}).catch(err =>{
    console.log("error: "+ err);
});

//index
app.get('/', routerIndex);
// app.render
// app.get('/login', routerIndex);


app.get('/register', routerIndex);
app.post('/register', routerRegister);

app.post('/home', routerIndex);
app.get('/home', routerIndex);



app.get('/mojeankiety/:uspass', routerHome);

app.get('/dodajankiete', routerHome);
app.post('/dodajankiete', routerSurvey);
app.post('/addSurveyByKey', routerSurvey);
// app.get('/user', router);   routerShow

//app.get('/=', routerShow);
app.get('/zaladujankiete/:id', routerShow);

app.get('/wynikiankiety/:id/:usccv', routerShow);

app.post('/sendSurvey/:id', routerShow);
// app.get('/home', routerHome);

app.listen(port, console.log(`Serwer urochomiony na porcie 1337`));




function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



module.exports = app;