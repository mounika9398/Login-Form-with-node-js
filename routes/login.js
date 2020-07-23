const bcrypt = require('bcrypt');
const saltRounds = 10;
var connection = require('./db_connection')
var http = require('http');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysectokemhere';

exports.login = async function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
          const accessToken = jwt.sign({ username: email }, accessTokenSecret)
            res.send({
              "code":200,
              "success":'',
              "authToken":accessToken,
              "responseCode":"SUCC"
             
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });
}
