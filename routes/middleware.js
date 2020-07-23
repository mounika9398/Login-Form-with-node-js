const jwt = require('jsonwebtoken');
const accessTokenSecret = 'mysectokemhere';

exports.authorize = authenticateJWT = (req, res, next) => {
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
