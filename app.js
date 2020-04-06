const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require('./config/database');
const app = express();
const port = 1337;
const routerIndex = require('./routes/index');



db.authenticate().then(() =>{
    console.log('database connected')
}).catch(err =>{
    console.log("error: "+ err);
});

//index
app.get('/', routerIndex);
// app.render
app.get('/login', routerIndex);
// app.get('/user', router);

app.listen(port, console.log(`Serwer urochomiony na porcie 1337`));