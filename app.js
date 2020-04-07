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
// const routerHome = require('./routes/home');

app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


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
// app.get('/user', router);

// app.get('/home', routerHome);

app.listen(port, console.log(`Serwer urochomiony na porcie 1337`));

module.exports = app;