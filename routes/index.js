var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/admin/home');
});

router.get('/admin/home', function(req, res, next) {
  res.render('index', {
    title: '루이비스베베 웹매니져' ,
    err: null
  });
});

module.exports = router;
