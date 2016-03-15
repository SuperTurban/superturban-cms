var trackerEventModel = require('./../models/tracker-event.js');


var FieldController = {
	routeName : 'tracker',
	authedRouteList : ['delete','update','create'],

	before : function(req,res,next){
		next();
	},

	list : function(req,res){

		trackerEventModel.find().exec(function(err,fields){
			if(err)
				return res.json({success : false, msg: err});

			if(fields)
				return res.json({success : true, docs : fields});
			else
				return res.json({success : false, msg: 'No data'});
		});

	},

	create : function(req,res){
		var response = Object.create(null);



	},


};

module.exports = FieldController;
