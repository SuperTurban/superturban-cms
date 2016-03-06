var pageModel = require('./../models/page.js');


var PageController = {
	routeName : 'pages',
	authedRouteList : ['delete','update','create'],

	before : function(req,res,next){
		next();
	},

	list : function(req,res){
		pageModel.find().exec(function(err,pages){
			if(err)
				return res.json({success : false, msg: err});

			if(pages)
				return res.json({success : true, docs : pages});
			else
				return res.json({success : false, msg: 'No data'});
		});

	},

	show : function(req,res){
		pageModel.findOne({slug: req.params.slug}).exec(function(err,page){
			if(err)
				return res.json({success : false, msg: err});

			if(page)
				return res.json({success : true, doc : page});
			else
				return res.json({success : false, msg: 'No data'});
		});

	},

	index : function(req,res){
		console.log('index accessed');
		res.json();
	},

	delete : function(req,res){
		pageModel.remove({slug: req.params.slug}).exec(function(err){
			if(err)
				return res.json({success : false, msg: err});
			return res.json({success : true});
		});
	},

	update : function(req,res){
		var data = req.body;
		delete data.token;
		pageModel.update({slug: req.params.slug},data,function(err,result){
			if(err)
				return res.json({success : false, msg: err});

			if(result)
				return res.json({success : true});
			else
				return res.json({success : false, msg: 'No pagers '});
		});
	},

	create : function(req,res){

		var response = Object.create(null);

		var page = new pageModel();
		page.body = req.body.body;
		page.slug = req.body.slug;
		page.title = req.body.title;

		page.save(function(err){
			if(err)
				{
					return res.json({success:false, msg:err});
				}
			response.success = true;
			return res.json(response);

		});

	},


}

module.exports = PageController;