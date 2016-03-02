function Page(optionsObject,model){

	var page = Object.create(model);

	page.collection = 'pages';

	page.app = model.app;
	page.content = optionsObject.content; 
	page.author = optionsObject.author; 

	page.fields = optionsObject.fields;	

	page.title = optionsObject.title;
	page.slug = optionsObject.slug;

	page.storables = ['author','content','title','slug'];

	return page;
}

module.exports=Page;


