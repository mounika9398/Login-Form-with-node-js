var connection = require('./db_connection')
exports.updates = async function(req,res){
  connection.query('update users set first_name=?, last_name=? where email=? ',[req.body.first_name,req.body.last_name,req.body.email], function (error, results, fields) {
    if (error) {
      
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "code":200,
        "success":"Updated sucessfully",
        "responseCode":"SUCC"

          });
      }
  });
}


