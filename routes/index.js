module.exports = function(app,express){

	var router = express.Router();
	var jwt = require('jsonwebtoken');

	var trackerEventModel = require('../models/tracker-event.js');


	router.get('/api/stats',function(req, res){
		var start = new Date();
		trackerEventModel.getLastNDaysCallCounts(30,{}, function(err,d){
			var dur = new Date() - start;
			console.log('query took: ', dur);
			return res.json({success : true, data : d});
		})
	});

	/***********************
	======TEST ROUTES=======
	***********************/

	router.get('/test', function(req, res) {
	    res.json({ title: 'Express' });
	});

	router.get('/install', function(req,res){
		var username = 'admin';
		var user_pw = 'adminpass';

		var hashing = req.hashing;

		var collection = app.db.get('users');

		var hashingResult = hashing.hash(user_pw);

		var user = {
			username : username,
			user_pw : user_pw,
			password : hashingResult.hash,
			salt : hashingResult.salt,
			permissions : ['all'],
		}

		var usersCollection = app.db.get('users');
		usersCollection.insert(
			user,
			function(err,doc){
				if(err)
					res.json({failure:true,err:err});
			}
		);

		res.json(user);
	});



	router.get('/makerandomuser',function(req,res){
		var userModel = require('./../models/user.js');

		var user = new userModel({
			username : 'admin',
			name : 'Test Admin',
			password : 'admin',
			email : 'admin@admin.com',
			status : 'vefified',
		});
		user.save(function(user){
			res.json(user);
			return;
		});

	});

	router.post('/api/auth', function(req, res) {
		   var userModel = require('./../models/user.js');
		   console.log(req.body.username);
		   userModel.findOne(
		   	{username : req.body.username},
		   	function(err, user){
		   		if(err)
		   		{
		   			console.log(err);
		   			res.json({'success': false, msg : 'Internal error'});
		   			return false;
		   		}
		   		if(!user){
		   			res.json({'success': false, msg : 'User does not exist'});
		   			return false;
		   		}

		   		if(!user.checkPassword(req.body.password)){
		   			res.json({'success': false, msg : 'Password does not match!'});
		   			return false;
		   		}

		   		var userPayload = Object.create(null);
		   			userPayload.username = user.username;
		   			userPayload.user_id = user._id;

		   		var token = jwt.sign(
		   			userPayload,
		   			app.get('jwtsecret'),
		   			{ expiresIn : 1200 }
		   		);

			    res.json({
			      success: true,
			      id : user.id,
			      username : user.username,
			      msg: 'Token created successfully!',
			      token: token
			    });
		   	});
	});




	return router;

}
