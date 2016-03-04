var pageFactory = require('./../models/page.js');
var entRepo = require('./../repositories/entity-repository.js');

var should = require('should');

describe('Model', function(){
	var saveID = null;


	describe('save',function(){

		before(function(done){
			var page = pageFactory({content:'provisional content', author:'provisional author'});
			page.save(function(docs){
				saveID = docs._id;
				done();
			});
		});

		it('should save new entity to the db', function(done){
			var page = pageFactory({content:'test', author:'testauthor'});

			page.save(
				function(page){
					page.author.should.equal('testauthor');
					page.content.should.equal('test');
					done();	
				},
				function(err){
					throw err;
				}
			);	
		});

		it('should update existing entity',function(done){
			var pageRepo = new entRepo(pageFactory);

			pageRepo.getEntityByID(saveID,function(page){
				page.content = 'updated content';
				page.save(function(page){
					pageRepo.getEntityByID(saveID,function(page){
						should(page.content).equal('updated content');
						done();
					})
				});
			});
		});
	});

	describe('delete',function(){
		it('should delete entity from database',function(done){

			var pageRepo = new entRepo(pageFactory);

			pageRepo.getEntityByID(saveID,function(page){

				page.delete(function(resp){
					resp.should.be.exactly(true);

					pageRepo.getEntityByID(saveID,function(page){
						should(page).be.exactly(null);
						done();
					});
				});
			});

		});

	});

});