var pageModel = require('./../models/page.js');
var fieldModel = require('./../models/field.js');

var s = "2";

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
		pageModel.findOne({slug: req.params.slug}).populate('author').exec(function(err,page){

			if(err)
				return res.json({success : false, msg: err});

			if(page)
			{
				fieldModel.find({parent : page._id}).exec(function(err,fields){
					if(err)
						return res.json({success : false, msg: err});

					doc = page.toObject();
					//find subfields
					var field_ids = fields.map(function(elem){
						return {parent : elem._id};
					});

					var storeFields = [];
					fieldModel.find({$or : field_ids},function(err,subfields){
						fields.forEach(function(field){
							var sField = field.toObject();
							sField.subfields = [];
							subfields.forEach(function(subField){
								if(sField._id == subField.parent)
								console.log(sField, subField);
									sField.subfields.push(subField);
								});
							storeFields.push(sField);
						});

						doc.fields = storeFields;
						return res.json({success : true, doc : doc});
					});

				});
			}
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
		page.author = req.jwtdata.user_id;

		page.save(function(err){
			if(err)
				{
					return res.json({success:false, msg:err});
				}
			response.success = true;
			return res.json(response);
		});

	},


};



module.exports = PageController;
