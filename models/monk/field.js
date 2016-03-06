function Field(optionsObject,model){
	
	var field = Object.create(model);

	field.collection = 'fields';

	field.app = model.app;
	field.content = optionsObject.content; 
	field.author = optionsObject.author; 

	field.fields = [];	
	
	field.title = optionsObject.title;
	field.key = optionsObject.key;

	field.storables = ['author','content','title','key'];
	return field;
}

module.exports=Field;

