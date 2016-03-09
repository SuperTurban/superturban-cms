var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fieldSchema = new Schema({
  title:  {required : true, type : String},
  author: {required : true, type : Schema.Types.ObjectId, ref : 'User'},
  body:   {required : true, type : String},
  type:   {required : true, type : String},
  status: {type : String},
  parent : {type: Schema.Types.ObjectId, refPath : 'kind'},
  key:   {required : true, type : String, index:true, unique : true}
}, {timestamps : { createdAt : 'created_at', updatedAt : 'updated_at'}});


module.exports = mongoose.model('Field', fieldSchema);
