/*
based on express mvc example boot.js
*/

var express = require('express');
var fs = require('fs');
var jwt = require('jsonwebtoken');


module.exports = function(parent, options){
	
var validateToken = function(req,res,next){
	jwt.verify(req.body.token, parent.get('jwtsecret'), function(err, decoded) {      
  	    if (err) 
    	    return res.json({ success: false, message: 'Failed to authenticate token.' });    
    	req.decoded = decoded;    
    	next();
  	});
};	
  var verbose = options.verbose;
  fs.readdirSync(__dirname+'./../controllers/').forEach(function(name){
    var obj = require('./../controllers/' + name);
    var name = obj.name || name;
    var prefix = '/api'
    var app = express();
    var handler;
    var method;
    var path;

    var routeName = obj.routeName;
    for (var key in obj) {
      if (~['name', 'prefix', 'engine', 'before', 'routeName','authedRouteList','checkPermission'].indexOf(key)) continue;

      switch (key) {
        case 'show':
          method = 'get';
          path = '/' + routeName + '/:slug';
          break;
        case 'list':
          method = 'get';
          path = '/' + routeName +'/list';
          break;
        case 'update':
          method = 'post';
          path = '/' + routeName + '/:slug/update';
          break;
        case 'create':
          method = 'post';
          path = '/' + routeName + '/create';
          break;
        case 'index':
          method = 'get';
          path = '/' + routeName;
          break;
        case 'delete':
          method = 'delete';
          path = '/' + routeName + '/:slug';
          break;
        default:
          method = 'get';
          path = '/';
          break;
      }

      // setup
      handler = obj[key];
      path = prefix + path;

	  if(obj.authedRouteList){
	      	if(~obj.authedRouteList.indexOf(key)){
	      		app[method](path, validateToken);		
	      	}
      }     
      // before middleware support
      if (obj.before) {
        app[method](path, obj.before, handler);
        verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), path, key);
      } else {
        app[method](path, handler);
        verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
      }
    }

    // mount the app
    parent.use(app);
  });
};