 // getting mysql database
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//connecting to mysql database
const db = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user ,
    password: process.env.Database_password ,
    database: process.env.Database 
});
//end
//logging in the user
exports.login = async (req,res) => {
    
 const {Email, Password} = req.body;

     try{    db.query('SELECT Email,Password FROM users WHERE Email = ?', [Email], async (error, results) => {
            
           /*  if(!results || !(await bcrypt.compare(Password, results[0].Password)) ) {
                 console.log(results);
               return res.status(401).render('login', {
                   message: "email or password is incorrect"
                 });
   
             }*/
                  if(!error && results.length){
                      
                 bcrypt.compare(Password, results[0].Password, function(err, ok){
                     if(!err && ok){
                        console.log(results);
                        const Id = results[0].Id;
       
                        const token = jwt.sign({ Id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                          
                        console.log("token is " + token);
          
                       const cokkieOptions = {
                           expires: new Date (
                               Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                           ),
                           httpOnly: true
                       }
          
                      res.cookie('jwtoken', token, cokkieOptions);
                      res.status(200).redirect("/");
                    } 
                    else{
                    console.log(results);
                    return res.status(401).render('login', {
                        message: "email or password is incorrect"
                      
                    })
                }
            })
            }
            else {
                return res.render('login', {
                    message: "email or password is incorrect"
                  
                })
            }
        })
    }
          catch (error) {
             console.log(error);
          }
    
        }
   

 

//registering the user
exports.register = (req, res) => {
    console.log(req.body);

    const {fullname, Email, Password, Confirm_Password} = req.body;

    
db.query('SELECT Email From users WHERE Email = ?', [Email], async (error, results) =>{
    if(error){
        console.log(error);
    }

    if(results.length > 0){
        return res.render('register', {
            message: "The email you've entered has already been taken"
        })
    }
        else if(Password !== Confirm_Password){
            return res.render('register', {
                message: "Passwords do not match"
        })
    }


  let hashedPassword = await bcrypt.hash(Password, 8);
  console.log(hashedPassword);

  db.query('INSERT INTO users SET ?', {fullname: fullname, Email:Email, Password: hashedPassword}, (error, results) => {
      if(error){
          console.log(error)
      }
      else {
          console.log(results);
         return  res.render('register', {
             message: "User registered"
         })
      }
  })
  
  });

     
}
//end

//signing in the user

