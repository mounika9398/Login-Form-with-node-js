const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = require('./db_connection')
exports.registration = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  var users={
     "first_name": req.body.first_name,
     "last_name": req.body.last_name,
     "email":req.body.email,
     "password":encryptedPassword
   }
   
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      
      res.send({
        
        "success":"user registered sucessfully"
        
      });
      }
  });
}
