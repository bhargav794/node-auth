const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');
const cookieParser = require("cookie-parser")

dotenv.config({ path: './.env'});//encrypting the sensitive info in .env

const app = express();//getting express method

const db = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user ,
    password: process.env.Database_password ,
    database: process.env.Database 
});//connecting to mysql

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));
//parse url-encoded bodies(as sent by html forms)
app.use(express.urlencoded({extended: false}));

//parse JSON bodies (As sent by API clients)
app.use(express.json());
app.use(cookieParser());

//setting template engine to handlebars
app.set('view engine', 'hbs');



db.connect((error) =>{
   if(error){
       console.log(error)
   } 
   else{
       console.log("mysql connection successful---")
   }
})

 //defining routes
 app.use('/', require('./routes/pages'));
 app.use('/auth', require('./routes/auth'))
 
//setting localhost port
app.listen(5000, () =>{
    console.log("server started on port 5000");

});