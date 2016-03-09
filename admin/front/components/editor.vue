<template>
	<main-header></main-header>
	<main-nav></main-nav>

	<div id="content">
		<div class="container">
			<h2>
			<span v-if="CREATE_NEW">
				Create page
			</span>
			<span v-else>
				Update page
			</span>
			</h2>
			<span v-if="!CREATE_NEW" class="author">
				<strong>Author:</strong> {{doc.author.username}}
			</span>


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
						<textarea class="mediumedit">
						</textarea>
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

		<div class="container" v-for='field in fields'>
			<field-editor :field-data='field' :parent='doc'>
			</field-editor>
		</div>

		<div class="container">
			<div class="button" @click = "addNewField">
				Add new field
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
					this.cmsAPI.getPage(
						slug,
						function(doc){
							this.doc = doc;
							this.doc.oldslug = doc.slug;
							this.doc.type = 'Page';
							this.fields = doc.fields;
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

		ready: function(){
			var editor = new window.MediumEditor('.mediumedit',window.MediumEditor.config);
			editor.setContent(this.doc.body || 'Click here to change');
			editor.subscribe('editableInput', function(event, editable){
				this.doc.body=editable.innerHTML;
			}.bind(this));

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
					author : '',
					type : 'Page',
				},
				fields : [],
			}
		},
		events : {

		},
		methods : {
			addNewField : function(){
				var field = {

				};
				this.fields.push(field);
			},

			save: function(){
				var data = {};
				data.body = this.doc.body;
				data.title = this.doc.title;
				data.slug = this.doc.slug;
				this.cmsAPI.createPage(
					data,
					function(){
						this.$broadcast('save');
						this.$route.router.go('/pages');
					}.bind(this),
					function(err){
						//TODO errhandler
					});
			},
			update : function(){
				var data = {};

				data.body = this.doc.body;
				data.title = this.doc.title;
				data.slug = this.doc.slug;
				this.cmsAPI.updatePage(
					this.doc.oldslug,
					data,
					function(){
						this.$route.router.go('/pages');
					}.bind(this),
					function(err){
						//TODO errhandler
					});

			},

		}
	}
</script>

<style lang="sass">
@import './../sass/global.scss';
</style>
