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
