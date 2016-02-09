/*******************
 * modules
 *******************/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var engine = require('ejs-locals');

/*******************
 * router modules
 *******************/
var routes = require('./routes/index');
var users = require('./routes/users');

/*******************
 * setup express
 *******************/
var app = express();
var port = '3000';
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*******************
 * secure
 *******************/
app.all('/admin/*', function(req, res, next) {
  // CORS headers
  // restrict it to the required domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type,Accecpt,X-Access-Token,X-Key");
  console.log("test");
  if(req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}, require('./routes/lib/validateRequest'));

/*******************
 * routing
 *******************/
app.use('/', routes);
app.use('/users', users);

/*******************
 * http server open
 *******************/
var httpServer = http.createServer(app);
httpServer.listen(port, function() {
  console.log("HTTP Server listening on port " + app.get('port'));
});
