var cmsAPI = function(){
	//authentication
	this.loggedIn = false;
	this.vue = null;
	this.state = null;
	this.login = function(username, password, success){
		var creds = {username : username, password : password};

		this.vue.http.post('/api/auth', creds)
			.then(function(resp){
				if(resp.data.success){

					this.state = resp.data;
					this.loggedIn = true;
					success();

				}
			}.bind(this),function(err){
				console.log(resp.data);
		});
	};

	this.getExpires = function(){

	},

	this.addToken = function(data){
		data.token = this.state.token;
		return data;
	};

	//calls to tracker
	this.getLast30DaysCount = function(successHandler,errorHandler){
		this.vue.http.get('/api/stats')
		.then(function(resp){
			if(resp.data.success){
				successHandler(resp.data.data);
			}
			else{
				errorHandler(resp)
			}
		},function(err){
			errorHandler(err);
		});
	}
	//calls to resources
	this.createPage = function(data,successHandler,errorHandler){
		var data = this.addToken(data);
		this.vue.http.post('/api/pages/create',data)

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
	};
	this.getPages = function(successHandler,errorHandler){
		this.vue.http.get('/api/pages/list')
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
	};

	this.getPage = function(slug,successHandler,errorHandler){
		this.vue.http.get('/api/pages/'+slug)
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

	this.updatePage = function(slug, data, successHandler, errorHandler){
		var data = this.addToken(data);
		this.vue.http.post('/api/pages/'+slug+'/update',data)
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
	};

	this.deletePage = function(slug,successHandler, errorHandler){
		var data = this.addToken({});
		this.vue.http.delete('/api/pages/'+slug, data)
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
	};

	this.createField = function(data,successHandler,errorHandler){
		var data = this.addToken(data);

		this.vue.http.post('/api/fields/create',data)
		.then(function(resp){
			if(resp.data.success){
				successHandler(resp.data);
			}
			else{
				errorHandler(resp.data);
			}

		},function(err){
			errorHandler(err);
		});
	};

	this.getFields = function(successHandler,errorHandler){
		this.vue.http.get('/api/fields/list')
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

	this.getField = function(slug,successHandler,errorHandler){
		this.vue.http.get('/api/fields/'+slug)
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
	};

	this.updateField = function(slug, data, successHandler, errorHandler){
		var data = this.addToken(data);
		this.vue.http.post('/api/fields/'+slug+'/update',data)
		.then(function(resp){
			console.log(resp);
			if(resp.data.success){
				successHandler();
			}
			else{
				errorHandler(resp);
			}
		},function(err){
			errorHandler(err);
		});
	};

	this.deleteField = function(slug,successHandler, errorHandler){
		var data = this.addToken({});
		this.vue.http.delete('/api/fields/'+slug, data)
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
	};
};

var API = new cmsAPI();
module.exports = {
	install : function(Vue){
		API.vue = Vue;
		Vue.prototype.cmsAPI = API;
	},
};
