var fieldModel = require('./../models/field.js');


var FieldController = {
	routeName : 'fields',
	authedRouteList : ['delete','update','create'],

	before : function(req,res,next){
		next();
	},

	list : function(req,res){

		fieldModel.find().exec(function(err,fields){
			if(err)
				return res.json({success : false, msg: err});

			if(fields)
				return res.json({success : true, docs : fields});
			else
				return res.json({success : false, msg: 'No data'});
		});

	},

	show : function(req,res){
		fieldModel.findOne({slug: req.params.slug}).populate('author').exec(function(err,field){
			if(err)
				return res.json({success : false, msg: err});

			if(field)
				return res.json({success : true, doc : field});
			else
				return res.json({success : false, msg: 'No data'});
		});

	},

	index : function(req,res){
		console.log('index accessed');
		res.json();
	},

	delete : function(req,res){
		fieldModel.remove({key: req.params.slug}).exec(function(err){
			if(err)
				return res.json({success : false, msg: err});
			return res.json({success : true});
		});
	},

	update : function(req,res){
		var data = req.body;
		delete data.token;

		fieldModel.update({key: req.params.slug},data,function(err,result){
			if(err)
				return res.json({success : false, msg: err});

			if(result)
				return res.json({success : true});
			else
				return res.json({success : false, msg: 'No field '});
		});
	},

	create : function(req,res){
		var response = Object.create(null);

		var field = new fieldModel();
		field.body = req.body.body;
		field.key = req.body.key;
		field.title = req.body.title;
		field.author = req.jwtdata.user_id;
		field.type = req.body.type;

		if(req.body.parent && req.body.parent.length > 5){
			field.kind = req.body.parentkind;
			field.parent = req.body.parent;
		}

		field.save(function(err,doc){
			if(err)
				{
					return res.json({success:false, msg:err});
				}
			response.success = true;
			response.doc = doc;
			return res.json(response);
		});

	},


}


module.exports = FieldController;
