var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var routes = require('./routes/index');
var jwt = require('jsonwebtoken');


global.app = express();
var db = monk('localhost:27017/base');

app.set('jwtsecret', 'testsecret');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(function(req,res,next){
    req.db = db;
    next();
});


app.use(['/install', '/api/auth'],function(req,res,next){
	req.hashing = require('./util/hashing');
	next();
});

app.use('/api/admin/',function(req, res, next) {

  var token = req.body.token;

  if (!token)
  	return res.status(403).send({success:false, message:'Permission denied!'}); 

  	jwt.verify(token, app.get('jwtsecret'), function(err, decoded) {      
  	    if (err) 
    	    return res.json({ success: false, message: 'Failed to authenticate token.' });    

    	req.decoded = decoded;    
    	next();
  	});
 });



app.use(logger('dev'));
app.use('/', routes);



//favicon
//app.use(favicon(__dirname + '/public/favicon.ico'));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
