const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
const port = 1337;
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pi'
});

conn.connect(function(err){
    if(err){
        console.log("Serwer nie działa");
    }else{
        console.log("Serwer dziala");
    }
});

app.get('/', function(req, res) {
    res.send(`Index ${port}`);
});


app.listen(port, console.log(`Serwer urochomiony na porcie 1337`));