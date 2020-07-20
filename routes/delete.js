var connection = require('./db_connection')
exports.delete = async function(req,res){
  connection.query('delete from users where email=?',[req.body.email], function (error, results, fields) {
    if (error) {
      
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "code":200,
        "success":"Deleted sucessfully",
        "responseCode":"SUCC"
          });
      }
  });
}
