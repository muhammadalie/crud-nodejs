var express = require('express');
//var Busboy = require('busboy');
var mongoose = require('mongoose');

const multer = require('multer');

//const models = require('../models/schema');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

const storageFunctions = require('../controllers/file');
var router = express.Router();

// function checkAuthentication(req, res, next) {
// 	console.log(req.user);
// 	if (req.isAuthenticated()) {
// 		next();
// 	} else {
// 		return res.status(400).send({ result: 'Unauthorized' });
// 	}
// }

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		console.log(file);
		var filetype = '';
		if (file.mimetype === 'image/gif') {
			filetype = 'gif';
		}
		if (file.mimetype === 'image/png') {
			filetype = 'png';
		}
		if (file.mimetype === 'image/jpeg') {
			filetype = 'jpg';
		}
		if (file.mimetype === 'text/plain') {
			filetype = 'txt';
		}
		cb(null, 'image-' + Date.now() + '.' + filetype);
	}
});
var uploads = multer({ storage: storage });

router.post('/upload', uploads.single('file'), storageFunctions.uploadfile);

router.get('/download', storageFunctions.downloadFile);

router.get('/list', storageFunctions.listFiles);
router.post('/delete', storageFunctions.deletFile);

module.exports = router;
