# nodejs user auth
A test project to implement simple login and register using **Node.js, express.js,bcrypt.js & MySQL**
* This project allows user to login and register 
* when the user is logged in a cookie is passed using jwt so that he dont have to login everytime he visits the website
* Handlebars is used as the templating language

# Modules used
* "nodemon"
* "bcryptjs"
* "cookie-parser"
* "dotenv"
* "express"
* "hbs"
* "jsonwebtoken"
* "mysql"

# Install
Make sure you have Nodejs & xampp installed
start mysql & apache on the xampp server 


# configure
In .env file
Database = <your database name>
Database_host = localhost
Database_user = root 
Database_password = 
JWT_SECRET = <give a secret password>
JWT_EXPIRES_IN = <Number of days  token expires in >
JWT_COOKIE_EXPIRES = <Number of days cookie expires in>
  
  **Create a .env file with above variables and set your parameters**
  
  # START
  
  
