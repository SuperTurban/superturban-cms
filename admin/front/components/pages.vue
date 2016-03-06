<template>
	<main-header></main-header>


	<main-nav></main-nav>

	<div id="content">
		<div class="container">
			<h2>Pages</h2>

			<div class="createEntityButton button" @click = 'newPageClickHandler'>
				Create new page
			</div>

			<div class="entitylist">
				<div class="entity header">
					<div class="title">
						<strong>Title</strong>
					</div>	

					<div class="date">
						<strong>Update date</strong>
					</div>

					<div class="actions">
						<strong>Actions</strong>
					</div>
				</div>

				<div class="entity" v-for="doc in docs">

					<div class="title" @click="editEntity($index)">
						{{doc.title}}	
					</div>	

					<div class="date">
						{{doc.updated_at | datestring}}	
					</div>

					<div class="actions">
						<span @click="editEntity($index)">Edit</span>	
						<span @click="deleteEntity($index)">Delete</span>
					</div>

				</div>
			</div>
		</div>	
	</div>

</template>

<script>
	module.exports = {
		route : {
			activate : function(done){
				this.$parent.cmsAPI.getPages(function(docs){
					this.docs = docs;
					console.log(docs);
					done.next();
				}.bind(this),
				function(){
					//TODO: bad response handler
					done.next();
				});
			},
		},
		init : function(){
		},
		data : function(){
			return {
				docs : [],
			}	
		},
		methods : {
			newPageClickHandler : function(){
				this.$route.router.go('/pages/create');	
			},
			editEntity : function(index){
				var self = this;
				this.$route.router.go('/pages/edit/'+this.docs[index].slug);
			},
			deleteEntity : function(index){
				this.$parent.cmsAPI.deletePage(
					this.docs[index].slug,
					function(){
						this.docs.splice(index,1);
					}.bind(this),
					function(err){
						//TODO: bad response handler
					}
				);		
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