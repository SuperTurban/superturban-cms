var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title:  {required : true, type : String},
  author: {type : String},
  body:   {required : true, type : String},
  status: {type : String},
  slug:   {required : true, type : String, index:true, unique : true}
}, {timestamps : { createdAt : 'created_at', updatedAt : 'updated_at'}});


module.exports = mongoose.model('Page', pageSchema);