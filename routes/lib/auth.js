var jwt = require('jwt-simple');

var auth = {
  validate: function(id, pw) {
    var user;
    if (id =="test" && pw == '123') {
      user = {
        name: '김창영',
        role: 'super',
        id: id
      }
    }
    return user;
  },
  genToken: function(user) {
    var expires = expiresIn(30); // 30 Days
    var token = jwt.encode({
      exp: expires
    }, require('../../config').jwtSecure);

    return {
      token: token,
      expires: expires
    }
  }
};

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
