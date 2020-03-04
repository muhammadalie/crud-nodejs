var express = require('express');
var router = express.Router();

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.status(400).send({ result: 'Unauthorized' });
	}
}

const store = require('../controller/store');

router.post('/create/', checkAuthentication, store.createNote);

router.get('/get/', checkAuthentication, store.getNote);

router.get('/list/', checkAuthentication, store.listNote);

router.put('/update/', checkAuthentication, store.updateNote);

router.post('/remove/', checkAuthentication, store.removeNote);

module.exports = router;
