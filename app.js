const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const db = require('./config/database');
const app = express();
const port = 1337;



db.authenticate().then(() =>{
    console.log('database connected')
}).catch(err =>{
    console.log("error: "+ err);
});

//index
app.get('/', require('./routes/index'));
// app.render

app.listen(port, console.log(`Serwer urochomiony na porcie 1337`));