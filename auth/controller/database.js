const User = require('../models/user').Auth;
var passport = require('passport');

function create(username, password) {
	return new Promise((resolve, reject) => {
		User.register(
			new User({ username: username, userId: username }),
			password,
			function(err, user) {
				if (err) {
					console.log('Error1: ', err);

					return reject(err);
				}
				return resolve(user);
			}
		);
	});
}
module.exports = {
	create: create
};
