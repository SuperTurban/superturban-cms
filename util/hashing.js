var Hashing = function(){
	
	var crypto = require('crypto');

	this.hash = function(pw){

		var salt = crypto.randomBytes(32).toString('hex');		
		var hash = crypto.createHash('sha1').update(salt).update(pw).digest('hex'); 
		return {hash : hash, salt: salt};
		
	}

	this.validateHash = function(dbHash, salt, inputPassword){

		var inputHashed = crypto.createHash('sha1').update(salt).update(inputPassword).digest('hex'); 

		if(dbHash === inputHashed)
			return true;
		else 
			return false;
	}

}

module.exports = new Hashing;