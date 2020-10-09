//used to encrypt passwords for creating users

export const encrypt = function(pword) {
	var crypto = require("crypto");
	var salt = crypto.randomBytes(20).toString('hex');

	var hash = salt.concat(pword);
	hash = crypto.createHash('md5').update(hash).digest('hex');

	var result = {};
	result['salt'] = salt;
	result['hash'] = hash;
	return result;
}