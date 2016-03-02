var page = new Page(options);

page.save(done,error);  // kui olemas update
			 			// kui ei ole siis create

/*
page.save kutsub model.saveDocument(collection, )
*/


page.save(done,error);

page.delete(done,error); //delete
page.addField(FieldObject, done,error); //lisa field Field Objectist

page.save(done,error);


function Page(options){
	var entity = Object.create(model);
	this.collection = 'pages';
}

function Field(options){
	var entity = Object.create(model);
	this.collection = 'fields',
}

Model = {
	save : function(success,error){

	}	
}