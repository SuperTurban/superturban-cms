var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//set up mongoose connection
require('./db/db.js');

var app = express();


app.set('jwtsecret', 'testsecret');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./boot/boot.js')(app, {verbose : !module.parent});

//bodyparser for json and form requests

var routes = require('./routes/index.js')(app,express);

app.use('/', routes);

//favicon
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
