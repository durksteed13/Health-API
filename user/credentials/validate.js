//used to validate crediential inputs
const crypto = require("crypto");

function validate(pword, db_salt, db_hash) {
	var hash = db_salt.concat(pword);
	hash = crypto.createHash('md5').update(hash).digest('hex');

	if(hash === db_hash) {
		return true;
	}
	return false;
}