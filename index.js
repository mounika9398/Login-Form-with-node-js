// require is used to import the modules
require('dotenv').config()
var express = require("express");
var login = require('./routes/login');
var registration = require('./routes/registration')
var update = require('./routes/update')
var del = require('./routes/delete')
var connection = require('./routes/db_connection')
var userList = require('./routes/get_users')
var path = require('path')
var bodyParser = require('body-parser');
let cors = require('cors');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysectokemhere';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
   if (authHeader) {
      const token =  authHeader.indexOf(' ') !== -1 ? authHeader.split(' ')[1] : authHeader;
      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

// body parser added
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// Allow cross origin requests

app.use(cors())
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

//route to handle user Login

app.post('/login', login.login);

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

//route to handle user registration

router.post('/register', registration.registration);
router.get('/signup.html', function(req, res) {
  res.sendFile(path.join(__dirname+"/"+'signup.html'));
});


//route to handle userList

app.get('/getUsers',authenticateJWT, userList.usersList);

//route to habdle user updates

app.post('/update',authenticateJWT,update.updates);

//route to handle use deletes

router.post('/delete',authenticateJWT,del.delete);

app.use('/', router);

// to connect to server

app.listen(3000);


