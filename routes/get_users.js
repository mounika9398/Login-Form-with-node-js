var connection = require('./db_connection');
exports.usersList = async function(req, res){
  connection.query('select first_name, last_name, email from users',[req.first_name,req.last_name,req.email], function (error, results, fields) {
    if(error) throw error;
    else{
      res.send(results)
    }
  });
}
