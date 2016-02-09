var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {
    login: true,
    title: '로그인',
    err: null
  });
});

router.post('/', function(req, res, next) {
  var id = req.body.username || '';
  var pw = req.body.pass || '';

  if (id == '' || pw == '') {
    res.render('login', {
      login: true,
      title: '로그인',
      err: 'id와 비번을 입력하세요'
    });
    return;
  }

  var user = auth.validate(id, pw);
  if (!user) {
    res.render('login', {
      login: true,
      title: '로그인',
      err: '로그인에 실패하였습니다. 다시 시도해주세요'
    });
    return;
  }

  var jwtData = auth.genToken(user);
  res.set({
    'X-Access-Token' : jwtData.token,
    'X-Key': user
  });

  res.redirect('/admin/home');
});

module.exports = router;
