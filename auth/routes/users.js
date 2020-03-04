var express = require('express');
const users = require('../controller/user.js');
var router = express.Router();
var passport = require('passport');

let auth = function(req, res, next) {
	req.body.username = req.body.username || req.body.userId;
	passport.authenticate('local')(req, res, function() {
		return next();
	});
};
function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.status(400).send({ result: 'Unauthorized' });
	}
}

router.post('/signup', function(req, res) {
	console.log('+++++++', req.body);
	if (!req.body.userId || !req.body.password) {
		res.status('400');
		res.send('Invalid details!');
	} else {
		console.log('success');
		users.doRegister(req, res);
	}
});

router.post('/login', auth, function(req, res) {
	if (!req.body.userId || !req.body.password) {
		res.status('400');
		res.send('Invalid details!');
	} else {
		console.log('login========>');
		users.login(req, res);
	}
});

router.put('/update/', checkAuthentication, users.updateProfile);
router.get('/get/', checkAuthentication, users.getProfile);

router.get('/logout', function(req, res) {
	req.logout();
	return res.status(200).send({ result: 'success' });
});

module.exports = router;
