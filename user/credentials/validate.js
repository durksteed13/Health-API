//used to validate crediential inputs

export const validate = function(pword, db_salt, db_hash) {
	var crypto = require("crypto");

	var hash = db_salt.concat(pword);
	hash = crypto.createHash('md5').update(hash).digest('hex');

	if(hash === db_hash) {
		return true;
	}
	return false;
}