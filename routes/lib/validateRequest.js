var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    console.log("token : " + token);
    console.log("key : " + key);
    next();
  } else {
    res.redirect('/users');
  }

};
