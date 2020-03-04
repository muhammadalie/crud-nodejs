const models = require('../models/user');
const User = models.User;

let create = (req, res) => {
	let params = req.body;
	console.log('CREATE: ', params);
	if (!params.userId || !params.password) {
		return res.status(404).send({
			message: 'missing parameters'
		});
	} else {
		// Create a User
		const user = new User({
			userId: req.body.userId,
			password: req.body.password,
			firstName: req.body.firstName || '',
			lastName: req.body.lastName || '',
			address: req.body.address
		});

		// Save Note in the database
		user
			.save()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				if (err.message.includes('duplicate key error')) {
					return res.status(400).send({
						message: 'profile allready exist'
					});
				}
				res.status(500).send({
					message: err.message || 'Some error occurred while creating the Note.'
				});
			});
	}
};

let getProfile = (req, res) => {
	console.log('11query1', req.query);
	console.log('11body1', req.body);
	console.log('params', req.params);
	let params = req.query;
	if (!params.userId) {
		return res.status(404).send({
			message: 'Please Provide userId'
		});
	} else {
		User.findOne({ userId: params.userId })
			.then(note => {
				if (!note) {
					return res.status(404).send({
						message: 'User not found'
					});
				}
				res.send(note);
			})
			.catch(err => {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'User not found'
					});
				}
				return res.status(500).send({
					message: 'Error retrieving note'
				});
			});
	}
};

let update = (req, res) => {
	// Validate Request
	let params = req.body;
	if (!req.body.userId) {
		return res.status(400).send({
			message: 'missing params'
		});
	}

	const user_n = {};
	if (params.firstName) {
		user_n['firstName'] = params.firstName;
	}
	if (params.address) {
		user_n['address'] = params.address;
	}
	if (params.lastName) {
		user_n['lastName'] = params.lastName;
	}

	User.updateOne({ userId: params.userId }, user_n)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found'
				});
			}
			return res.status(200).send({
				message: 'updated success'
			});
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'User not found'
				});
			}
			return res.status(500).send({
				message: 'Error retrieving user' + err
			});
		});
};

let remove = (req, res) => {
	console.log('11query1', req.query);
	console.log('11body1', req.body);
	let params = req.body;
	if (!params.userId) {
		return res.status(404).send({
			message: 'missing parameters'
		});
	} else {
		User.deleteOne({ userId: params.userId })
			.then(profile => {
				if (!profile) {
					return res.status(404).send({
						message: 'Profile not found'
					});
				}
				console.log('----------', profile);
				if (profile.deletedCount == 0) {
					return res.status(404).send({ message: 'Profile not found' });
				}
				return res
					.status(200)
					.send({ message: 'Profile deleted successfully!' });
			})
			.catch(err => {
				if (err.kind === 'ObjectId' || err.name === 'NotFound') {
					return res.status(404).send({
						message: 'Profile not found'
					});
				}
				return res.status(500).send({
					message: 'Could not delete Profile '
				});
			});
	}
};

module.exports = {
	create: create,
	// findAll: findAll,
	getProfile: getProfile,
	update: update,
	remove: remove
};
