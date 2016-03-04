var model = require('./model.js');

function PageFactory(options){
	var entity = Object.create(model);
	entity.collection = 'pages';

	if(typeof options !== "object")
		return entity;

	entity.content = options.content || false;
	entity.author = options.author || false;
	entity.persisted = false;
	entity.fields = [];
	entity
	return entity;
}

module.exports = PageFactory;


