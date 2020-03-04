const models = require('../models/schema');
const db = models.db;
const User = require('../models/user').Auth;
const registerModel = db.collection('users');
var passport = require('passport');

const profile = require('./profile-server');
const database = require('./database');

let doRegister = async function(req, res) {
	let params = req.body;
	req.body.username = req.body.userId;
	let profiles;
	try {
		profiles = await profile.profileCreate(req.body);
	} catch (error) {
		return res.status(400).send({ result: 'faild' });
	}
	if (profiles.statusCode !== 200) {
		return res.status(profiles.statusCode).send({ result: 'faild' });
	}
	try {
		await database.create(params.userId, params.password);
		passport.authenticate('local')(req, res, function() {
			let resp_data = JSON.parse(profiles.data);
			delete resp_data.password;
			return res.status(profiles.statusCode).send(resp_data);
		});
	} catch (error) {
		try {
			await profile.profileRemove(req.body);
			return res.status(400).send({ message: 'failed' });
		} catch (error) {
			return res.status(500).send({ message: 'failed' });
		}
	}
};

function login(req, res) {
	let data = req.body;
	let username = data.username;
	let password = data.password;
	req.body.username = req.body.userId;
	passport.authenticate('local')(req, res, async function() {
		console.log('data: ', data);
		try {
			let profiles = await profile.profileGet(req.body);
			let resp_data = JSON.parse(profiles.data);
			delete resp_data.password;
			return res.status(profiles.statusCode).send(resp_data);
		} catch (error) {
			return res.status(400).send({ result: 'faild' });
		}
	});
}

let updateProfile = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		address: req.body.address
	};
	try {
		let profiles = await profile.profileUpdate(data);
		if (profiles.statusCode !== 200) {
			return res.status(profiles.statusCode).send({ result: 'faild' });
		}
		return res.status(profiles.statusCode).send(JSON.parse(profiles.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let getProfile = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId
	};
	try {
		let profiles = await profile.profileGet(data);
		if (profiles.statusCode !== 200) {
			return res.status(profiles.statusCode).send({ result: 'faild' });
		}
		let resp_data = JSON.parse(profiles.data);
		delete resp_data.password;
		return res.status(profiles.statusCode).send(resp_data);
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

module.exports = {
	login: login,
	doRegister: doRegister,
	updateProfile: updateProfile,
	getProfile: getProfile
};
