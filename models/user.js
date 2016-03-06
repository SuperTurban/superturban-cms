var mongoose = require('mongoose');
var hashing = require('./../util/hashing.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {type : String, index:true, unique: true, required: true},
  password:  String,
  name: 	 String,
  email:     String,
  status: 	 String,
  salt: 	 String, 
  email:   	 {type : String, index:true, unique: true}
}, {timestamps : { createdAt : 'created_at', updatedAt : 'updated_at'}});

userSchema.pre('save', function(next) {
    var user = this;
    var hs = hashing.hash(user.password);
    user.password = hs.hash;
    user.salt = hs.salt;
    next();
});

userSchema.methods.checkPassword = function(pw){
	if(hashing.validateHash(this.password, this.salt, pw))
		return true;
	else
		return false;
}

module.exports = mongoose.model('user', userSchema);