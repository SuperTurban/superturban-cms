var db = require('./../db/db.js')

var EntityRepository = function(entityFactory){
		this.entityFactory = entityFactory;
		this.entity = entityFactory();
		this.entities = [];
} 

EntityRepository.prototype.getEntityByID = function(id ,success, error){
	var collection = this.getCollection();
	var promise = collection.findById(id);
	this.handlePromiseSingleEntity(promise, success, error);
},

EntityRepository.prototype.getEntityByKey = function(key, success, error){
	this.getEntityBy('key', key, success, error);
},

EntityRepository.prototype.getEntityBy = function(par, val, success, error){
	var collection = this.getCollection();
	var query = Object.create(null);

	query[par] = val;

	var promise = collection.findOne(query, {});
	this.handlePromiseSingleEntity(promise, success, error);
},

EntityRepository.prototype.getEntities = function(success, error){
	var collection = this.getCollection();
	var promise = collection.find({},{});

	promise.success(function(docs){
		success(this.createEntities(docs));
	}.bind(this));
}

EntityRepository.prototype.handlePromiseSingleEntity = function(promise, success, error){
	if(typeof error != 'function')
		error = function(){};

	promise.on('success',function(doc){
		if(doc === null)
			error(false);
		success(this.createEntity(doc));
	}.bind(this));

	promise.on('error',function(err){
		
			error(err);
	});
}	

EntityRepository.prototype.getCollection = function(){
	var modelCollection = this.entity.collection;
	return db.get(modelCollection);
},

EntityRepository.prototype.createEntity = function(docs){
	this.entity = this.entityFactory(docs);
	this.entity.persisted = true;
	this.entity.id = docs._id;

	return this.entity;
}

EntityRepository.prototype.createEntities = function(docs){
	var entities = [];

	docs.forEach(function(elem){
		entities.push(this.createEntity(elem));
	});

	return entities;
}

module.exports = EntityRepository;