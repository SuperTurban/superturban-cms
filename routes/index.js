var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');





//==============
//==TEST ROUTES=
//==============

router.get('/test', function(req, res) {
    res.json({ title: 'Express' });
});

router.get('/add',function(req,res){
	var db = req.db;
	var collection = db.get('atest');

	collection.insert({
		"username" : '123',
		"password" : '123123123',
	},function(err,doc){
			if(err)
				res.json({failure:true});
		}
	);

	res.json({'success':true})
});

router.get('/read',function(req,res){
	var db = req.db;
	var collection = db.get('users');

    collection.find({},{},function(e,docs){
    	res.json(docs);
    });
});



router.get('/install', function(req,res){
	var username = 'admin';
	var user_pw = 'adminpass';

	var db = req.db;
	var hashing = req.hashing;

	var collection = db.get('users');

	var hashingResult = hashing.hash(user_pw);

	var user = {
		username : username,
		user_pw : user_pw,
		password : hashingResult.hash,
		salt : hashingResult.salt,
		permissions : ['all'], 
	}

	var usersCollection = db.get('users');
	usersCollection.insert(
		user,
		function(err,doc){
			if(err)
				res.json({failure:true,err:err});
		}
	);

	res.json(user);
});

//===============
//==ADMIN ROUTES=
//===============

router.post('/api/auth', function(req, res) {


  var db = req.db;
  var usersCollection = db.get('users');

  usersCollection.findOne({username : req.body.username},{},function(e,docs){
  	console.log(docs);
  	   var user = {
  	   		username : docs.username,
  	   		id : docs._id,
  	   }

  	   if(!user)
  	   		return res.json({'success': false, 'message':'No user'});	

  	   if(!req.hashing.validateHash(docs.password, docs.salt, req.body.password ))
  	   		return res.json({'success':false, 'message': 'wrong password'});

	   var token = jwt.sign(user, app.get('jwtsecret'), {
	         expiresIn:1200 
	    });

	    res.json({
	      success: true,
	      id : user.id,
	      username : user.username,
	      message: 'Enjoy your token!',
	      token: token
	    });

    });
});

router.post('/api/admin',function(req,res){
	res.json({success:true,username: req.decoded.username});
});


module.exports = router;
