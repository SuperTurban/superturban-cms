module.exports = function(app,express){

	var router = express.Router();
	var jwt = require('jsonwebtoken');


	app.use(['/install', '/api/auth'],function(req,res,next){
		req.hashing = require('./../util/hashing');
		next();
	});

	app.use('/api/admin/',function(req, res, next) {

	  var token = req.body.token;
	  console.log(token);

	  if (!token)
	  	return res.status(403).send({success:false, message:'Permission denied!'}); 

	  	jwt.verify(token, app.get('jwtsecret'), function(err, decoded) {      
	  	    if (err) 
	    	    return res.json({ success: false, message: 'Failed to authenticate token.' });    

	    	req.decoded = decoded;    
	    	next();
	  	});
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


	/***********************
	======API ROUTES=======
	***********************/

	/**
		get /api/pages/
		get /api/pages/:id
		post /api/pages/create
		post /api/pages/:id/delete	
		post /api/pages/:id/update	
	**/


	router.get('/api/pages',function(req,res){
		var pageRepo = new entRepo(pageFactory);

		pageRepo.getEntities(function(pages){
			res.json(pages);
		});
	});

	router.get('/api/pages/:key',function(req,res){
		var pageRepo = new entRepo(pageFactory);

		pageRepo.getEntityByKey(function(page){
			res.json(page);
		});
	});


	router.post('/api/pages/:key/delete',function(req,res){
		var pageRepo = new entRepo(pageFactory);

		pageRepo.getEntityByKey(function(page){
			page.delete();
		});
	});


	router.get('/api/pages/:key',function(req,res){
		var pageRepo = new entRepo(pageFactory);

		pageRepo.getEntityByKey(function(page){
			res.json(page);
		});
	});

	router.get('/api/fields',function(req,res){
		  var usersCollection = app.db.get('fields');
		  usersCollection.find({},{},function(e,docs){
		  	res.json(docs);
		  });
	});

	/***********************
	======ADMIN ROUTES======
	***********************/
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

	router.post('/api/admin',function(req,res){
		res.json({success:true,username: req.decoded.username});
	});

	router.post('/api/admin')

	return router;

}


