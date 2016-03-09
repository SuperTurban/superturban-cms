var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(require('vue-resource'));
Vue.use(require('./cmslib.js'));
Vue.use(VueRouter);


var App = Vue.extend({
	ready : function(){
		if(!this.cmsAPI.loggedIn)
			this.$route.router.go('/');
	}
});

/*
Global components
*/
Vue.component('main-header', require('./components/main-header.vue'));
Vue.component('main-nav', require('./components/main-nav.vue'));
Vue.component('field-editor', require('./components/field-editor.vue'));
/*
filters
*/
Vue.filter('datestring', function(date){
	return new Date(date).toDateString();
});

var router = new VueRouter();

window.MediumEditor = require('medium-editor');

window.MediumEditor.config = {

   placeholder: {
        text: 'Type your text',
        hideOnClick: true
  },

  toolbar :{buttons :  ['bold','italic','anchor','h2','h3','unorderedlist']},

};

require('./css/medium-editor.min.css');
require('./css/flat.min.css');



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
		'/settings' :{
			component : require('./components/settings.vue')
		}
	}
);

router.start(App, "body");
