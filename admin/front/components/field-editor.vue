<template>

<div class="editor">
<div class="editorline ">

	<div class="label">
		<h4>Title</h4>
	</div>

	<div class="input">
		<input v-model = 'field.title'>
	</div>

</div>

<div class="editorline ">

	<div class="label">
		<h4>Content</h4>
	</div>

	<div class="input">
		<input v-model = 'field.body'>
	</div>

</div>

<div v-show="!field._id">
	<div class="editorline ">

		<div class="label">
			<h4>key</h4>
		</div>

		<div class="input">
			<input v-model = 'field.key'>
		</div>

	</div>

	<div class="editorline ">
		<div class="label">
			<h4>Type</h4>
		</div>
		<div class="input">
			<select v-model = "field.type" value="text">
				<option>
					Choose onc
				</option>
				<option id="text">
					Text
				</option>

				<option id="fields">
					Fields
				</option>

				<option id="content">
					Content
				</option>
			</select>
		</div>
	</div>
</div>

<div class="button" @click = "saveField()">
	Save field
</div>


</div>



</template>

<script>
var component = {};
component.methods = {};
component.events = {};

component.ready = function(){


	if(this.fieldData){
		this.field.body = this.fieldData.body;
		this.field.title = this.fieldData.title;
		this.field.type = this.fieldData.type;
		this.field.key = this.fieldData.key;
		this.oldkey = this.fieldData.key;
	}
	if(this.parent){
		this.field.parentkind = this.parent.type;
		this.field.parent = this.parent._id;
	}

}

component.data = function(){
	return {
		oldkey : false,
		field : {
			body : '',
			type : '',
			title : '',
			key : '',
			parentkind : '',
			parent : false,
		}
	}
};


component.methods.saveField = function(){
	if(this.oldkey)
		return this.updateField();
	var data = this.field;

	this.cmsAPI.createField(
		data,
		function(data){
			this.$dispatch('updated');
		}.bind(this),
		function(resp){

		}
	);
};


component.methods.updateField = function(){
	var data = this.field;

	this.cmsAPI.updateField(
		this.oldkey,
		data,
		function(data){

		}.bind(this),
		function(resp){
			//TODO errhandler
		}
	);

};


component.props = ['fieldData','parent'];

module.exports = component;
</script>
<style>
</style>
