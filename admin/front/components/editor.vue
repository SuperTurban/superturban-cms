<template>
	<main-header></main-header>
	<main-nav></main-nav>

	<div id="content">
		<div class="container">
			<h2>{{SAVE_OR_UPDATE}}</h2>

			<div class="editor">
				<div class="editorline">
					<div class="label">
						<h4>Title</h4>
					</div>
					<div class="input">
						<input v-model = 'doc.title'>
					</div>
				</div>

				<div class="editorline">
					<div class="label">
						<h4>Content</h4>
					</div>
					<div class="input">
						<input v-model = 'doc.body'>
					</div>
				</div>

				<div class="editorline">
					<div class="label">
						<h4>URL slug</h4>
					</div>
					<div class="input">
						<input v-model = 'doc.slug'>
					</div>
				</div>

			</div>

			<div v-if="CREATE_NEW" class="button" @click = 'save'>
					Save	
			</div>
			<div v-else class="button" @click = 'update'>
					Update	
			</div>


		</div>	
	</div>

</template>

<script>
	module.exports = {
		route: {
			activate:function(done){
				var slug = this.$route.params.slug;
				if(!slug)
					done.next();
				else{
					this.CREATE_NEW = false;
					this.$parent.cmsAPI.getPage(
						slug,
						function(doc){
							this.doc = doc;
							this.doc.oldslug = doc.slug;
							done.next();	
						}.bind(this),
						function(){
							done.next();
							//TODO:bad response handler
						}
					);
				}
			}
		},
		init : function(){

		},
		data : function(){
			return {
				CREATE_NEW : true,
				doc : {
					title : '',
					body : '',
					slug : '',
					oldslug : '',
				}
			}	
		},
		methods : {
			save: function(){
				var data = {};
				data.body = this.doc.body;
				data.title = this.doc.title;
				data.slug = this.doc.slug;
				
				this.$parent.cmsAPI.createPage(
					data,
					function(){
						this.$route.router.go('/pages');
					}.bind(this),
					function(err){
						console.log(err);
					});
			},
			update : function(){
				var data = {};
				data.body = this.doc.body;
				data.title = this.doc.title;
				data.slug = this.doc.slug;

				this.$parent.cmsAPI.updatePage(
					this.doc.oldslug,
					data,
					function(){
						this.$route.router.go('/pages');
					}.bind(this),
					function(err){
						console.log(err);
					});
			}
		}
	}
</script>


<style lang="sass">
@import './../sass/global.scss';
#main-nav{
	background-color:$darkbackground;
}
h1{
	color:black;
}
</style>