module.exports = function(app,express){

	var router = express.Router();
	var jwt = require('jsonwebtoken');


	app.use(['/install', '/api/auth'],function(req,res,next){
		req.hashing = require('./../util/hashing');
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
	var pageFactory = require('./../models/page.js');
	var entRepo = require('./../repositories/entity-repository.js');

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

	router.post('/api/auth', function(req, res) {


	  var usersCollection = app.db.get('users');

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

	router.post('/api/admin')

	return router;

}


