<template>

<div class="editor field-editor">




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
		<textarea id="{{identifier}}">
		</textarea>
	</div>

</div>
<div class="container" v-for='subfield in subfields'>
	<field-editor :field-data='subfield' :parent='field'>
	</field-editor>
</div>
<div v-show="showmore">
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

	<div class="button" @click = "addSubField">
		Add new field
	</div>
</div>

<div class="button" @click = "saveField()">
	Save field
</div>

<div class="showmorebutton"  @click = "showmore = !showmore">
	<div v-if ="showmore">
		Show less -
	</div>
	<div v-else>
		Show more +
	</div>
</div>


</div>



</template>

<script>
var component = {};
component.methods = {};
component.events = {};
component.created = function(){
	this.identifier = "me" + Math.floor(Math.random() * 1000000);
},
component.ready = function(){
		console.log(this.identifier);
	if(this.fieldData){
		this.field.body = this.fieldData.body;
		this.field.title = this.fieldData.title;
		this.field.type = this.fieldData.type;
		this.field._id = this.fieldData._id;
		this.field.key = this.fieldData.key;
		this.oldkey = this.fieldData.key;
		this.subfields = this.fieldData.subfields;
	}
	if(this.parent){
		this.field.parentkind = this.parent.type;
		this.field.parent = this.parent._id;
	}

	var editor = new window.MediumEditor('#'+this.identifier,window.MediumEditor.config);
	editor.setContent( this.field.body || 'Click here to change');

	editor.subscribe('editableInput', function(event, editable){
		this.field.body=editable.innerHTML;
	}.bind(this));
}

component.data = function(){
	return {
		identifier : '',
		oldkey : false,
		field : {
			body : '',
			type : '',
			title : '',
			key : '',
			parentkind : '',
			parent : false,
			_id : '',
		},
		subfields : new Array(),
		showmore : false
	}
};


component.methods.saveField = function(){
	if(this.oldkey)
		return this.updateField();
	var data = this.field;

	this.cmsAPI.createField(
		data,
		function(data){
			console.log(data);
			this.field._id = data.doc._id;
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
			//TODO: errhandler
		}
	);

};

component.methods.addSubField = function(){
			var field = {};
			console.log(this);
			this.subfields.push(field);
		},


component.props = ['fieldData','parent'];

module.exports = component;
</script>
<style>
	.showmorebutton{
		cursor:pointer;
		height:15px;
		line-height:15px;
		font-size:12px;
		width:100%;
		background-color:grey;
		padding:3px;
		margin-top:5px;
	}
</style>
