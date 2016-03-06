var db = require('./../db/db.js');

Model = {
		save : function(success,error){
			var collection = this.getCollection();	

			var doc = this.getDbDoc();


			if(this.persisted){
				var promise = collection.updateById(this.id, doc);
			}
			else{
				this.persisted = true;
				var promise = collection.insert(doc);
			}	

			promise.on('success',function(data){
				success(data);
			});
			promise.on('error',function(err){
				error(err);
			});
		},

		delete : function(success, error){
			var collection = this.getCollection();

			if(!this.persisted)
				return false;

			collection.remove({_id : this.id},function(){
				success(true);	
			});
		},


		getDbDoc : function(){
			var doc = Object.create(null);
			var notForStoring = ['persisted','collection','id'];

			for(v in this){
				if(this.hasOwnProperty(v)){
					if(notForStoring.indexOf(v) == -1)
						doc[v] = this[v];
				}
			}
			return doc;
		},

		getCollection : function(){
			var modelCollection = this.collection;
			return db.get(modelCollection);
		},
	}

module.exports = Model;