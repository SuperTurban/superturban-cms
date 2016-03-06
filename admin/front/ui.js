var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(require('vue-resource'));
Vue.use(VueRouter);


var loginManager = {
	loggedIn : false,
	state : null,
	login : function(username, password, success){
		var creds = {username : username, password : password};	

		Vue.http.post('/api/auth', creds)
			.then(function(resp){
				if(resp.data.success){
					loginManager.state = resp.data;
					loginManager.loggedIn = true;
					success();
				}
			},function(err){
				console.log(resp.data);
		});
	},
	getExpires : function(){

	},

	addToken : function(data){
		data.token = loginManager.state.token;
		return data;
	}
}


var cmsAPI = {
	createPage : function(data,successHandler,errorHandler){
		var data = loginManager.addToken(data);
		console.log(data);
		Vue.http.post('/api/pages/create',data)
		.then(function(resp){
			if(resp.data.success){
				successHandler(resp.data);
			}
			else{
				errorHandler(err);
			}
		},function(err){
			errorHandler(err);
		});
	},

	getPages : function(successHandler,errorHandler){
		Vue.http.get('/api/pages/list')
		.then(function(resp){
			if(resp.data.success){
				successHandler(resp.data.docs);
			}
			else{
				errorHandler(err);
			}
		},function(err){
			errorHandler(err);
		});
	},

	getPage : function(slug,successHandler,errorHandler){
		Vue.http.get('/api/pages/'+slug)
		.then(function(resp){
			if(resp.data.success){
				successHandler(resp.data.doc);
			}
			else{
				errorHandler(err);
			}
		},function(err){
			errorHandler(err);
		});
	},
	updatePage : function(slug, data, successHandler, errorHandler){
		var data = loginManager.addToken(data);
		Vue.http.post('/api/pages/'+slug+'/update',data)
		.then(function(resp){
			if(resp.data.success){
				successHandler();
			}
			else{
				errorHandler(resp);
			}
		},function(err){
			errorHandler(err);
		});
	},
	deletePage : function(slug,successHandler, errorHandler){
		var data = loginManager.addToken({});
		Vue.http.delete('/api/pages/'+slug, data)
		.then(function(resp){
			if(resp.data.success){
				successHandler();
			}
			else{
				errorHandler(resp);
			}
		},function(err){
			errorHandler(err);
		});
	}

}




var App = Vue.extend({
	data : function(){
		return {
			loginManager : loginManager,
			cmsAPI : cmsAPI,
		}
	},
	activate : function(done){
		setTimeout(function(){
			done();
		},5000);
	}	
});

/*
Global components
*/
Vue.component('main-header', require('./components/main-header.vue'));
Vue.component('main-nav', require('./components/main-nav.vue'));
/*
filters
*/
Vue.filter('datestring', function(date){
	return new Date(date).toDateString();
});


var router = new VueRouter();

router.map(
	{
		'/' : {
			component : require('./components/login.vue'),
		},

		'/dashboard': {
			component : require('./components/dashboard.vue')
		},

		'/pages' : {
			component : require('./components/pages.vue')
		},

		'/pages/create' :{
			component : require('./components/editor.vue')
		},

		'/pages/edit/:slug' :{
			component : require('./components/editor.vue')
		},
	}
);

router.start(App, "body");

