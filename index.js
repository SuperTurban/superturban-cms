var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var config = require('./config.js');

var app = express();
app.set('jwtsecret', 'testsecret');

app.use(logger('dev'));

//bodyparser for json and form requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.db = monk(config.db);
var routes = require('./routes/index.js')(app,express)
app.use('/', routes);

var model = require('./models/model.js')(app);
var pageModel = require('./models/page.js');

var testPage = {
	fields : [
		{
			author : 'authortest1',
			title : 'titletest1',
			content : 'testtcontent',
			key : 'testkey1'
		},
		{
			author : 'authortest2',
			title : 'titletest2',
			content : 'testtcontent2',
			key : 'testkey12'
		}
	],
	slug : 'ptestslug',
	content : 'ptestcontent',
	author : 'ptestauthor',
	title : 'ptesttitle'
}


var page = new pageModel(false,model);
page.getByID('56d6fcaca6d90efc27de49b1', function(docs){
	page = docs;
	page.getFields(function(fields){
		page.fields = fields;
		page.fields[0].author = 'authoer updated';
		page.author = 'author page\'il updated';
		page.update.call(page);
	});
});


//favicon
//app.use(favicon(__dirname + '/public/favicon.ico'));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
