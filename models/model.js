var Field = require('./field.js');

module.exports = function(app){

	return function(){ 

	var model = {
		app : app,

		saveObject : function (fieldIDs, curModel){
			var savedObject = Object.create(null);
			curModel.storables.forEach(function(e){
				savedObject[e] = curModel[e];
			});

			savedObject.fields = fieldIDs;
			var collectionToSaveTo = curModel.app.db.get(curModel.collection);

			var queryPromise = collectionToSaveTo.insert(savedObject);

			queryPromise.on('error',function(err){
				if(error)
					error(err);
			})

			queryPromise.on('success',function(docs){
				if(typeof done === 'function')
					done(docs);
			});
		},

		updateObject : function(fieldIDs,curModel,done,error){
				var updatedObject = Object.create(null);

				curModel.storables.forEach(function(e){
					updatedObject[e] = curModel[e];
				});

				var collectionToSaveTo = curModel.app.db.get(curModel.collection);

				var queryPromise = collectionToSaveTo.updateById('',{},updatedObject);

				queryPromise.on('error',function(err){
					if(error)
						error(err);
				})

				queryPromise.on('success',function(docs){
					if(done)
						done(docs);
				});
		},

		save : function(done,error){
			var curModel = this;
			if(curModel.fields.length){
				generateFields(curModel.fields,
					//success handler
					function(fieldIDs){
						curModel.saveObject(fieldIDs, curModel,done,error);
					},
					//error handler
					function(err){
						error(err);
					});
			}	
			else{
				curModel.saveObject([],curModel,done,error);
			}
		},

		update : function(done,error){
			var curModel = this;

			if(curModel.fields.length){

				var update_fields = [];

				var new_fields = curModel.fields.filter(function(elem){
					if(elem.hasOwnProperty('_id') && elem._id)
						update_fields.push(elem);
					else
						return elem;
				});

				generateFields(new_fields,
					//success handler
					function(fieldIDs){
						curModel.link(fieldIDs,curModel);
					},
					//error handler
					function(err){
						error(err);
					}
				);

				update_fields.forEach(function(field){
					var o = new Field(field, model) 

					for(v in field){
						o[v] = field[v];
					}
					o.update();
				});

			}	
			else{
				curModel.updateObject([],curModel);
			}
		},

		getFields : function(done){
				if(!this.fields.length) return false;

				var fields = this.fields.map(function(elem){
					return {_id : elem};
				});

				var collection = app.db.get('fields');

				var queryPromise = collection.find({$or : fields});

				queryPromise.on('error',function(err){
					console.log(err);
				});

				queryPromise.on('success',function(docs){
					done(docs);
				});
		},

		getByID : function(id,done){

			var collection = app.db.get(this.collection);
			var queryPromise = collection.findOne({_id : id});

			queryPromise.on('success',function(docs){
				var o =  Object.create(model);

				for(v in docs){
					o[v] = docs[v];
				}

				done(o);
			});
		}
	}

	function generateFields(fields,done,error){
		var fieldIDs = [];

		function fieldSaveDone(docs){
			fieldIDs.push(docs._id);	
			if(fieldIDs.length === fields.length){
				return done(fieldIDs);				
			}
		}

		fields.forEach(function(field){
			if(typeof field !== 'object')
				return false;
			var field = new Field(field, model);
			var fieldID = field.save(
				//success handler
				function(docs){
					fieldSaveDone(docs)
				},
				//error handler
				function(err){
					error(err);	
				}
			);
		});
	}

	return model;
	}()
}