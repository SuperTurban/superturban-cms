var page = PageFactory(options);

page.save(done,error);  // kui olemas update
			 			// kui ei ole siis create

/*
modelist
*/

page.save(done,error);
page.delete(done,error); //delete
page.addField(FieldObject, done,error); //lisa field Field Objectist
page.save(done,error);
page.getByID(done,error);

/*
page'ist
*/
page.getBySlug(done,error);


function Field(options){
	var entity = Object.create(model);
	this.collection = 'fields',
}

