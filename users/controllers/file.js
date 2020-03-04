var fs = require('fs');

const models = require('../models/store');
const File = models.Files;

let uploadfile = function(req, res, next) {
	let filename = req.body.filename;
	let userId = req.body.userId;
	var img = fs.readFileSync(req.file.path);
	if (!filename || !userId || !img) {
		return res.status(400).send({ result: '	missing params' });
	}
	console.log('+++++++++++++++++++', req.file.mimetype);
	if (req.file.path.split('.').pop() != 'txt') {
		var encode_image = img.toString('base64');
		var data = new Buffer(encode_image, 'base64');
	} else {
		var data = img;
	}
	File.findOne({ userId: userId, filename: filename }, (err, result) => {
		try {
			fs.unlinkSync(req.file.path);
			//file removed
		} catch (err) {
			console.error(err);
		}
		if (err) return console.log(err);
		console.log(result);
		if (result && result._id) {
			return res.status(400).send({ result: 'file allready exist' });
		} else {
			console.log('!!!!!!!!!!!', userId);

			// Create a Note
			const file = new File({
				userId: userId,
				filename: req.body.filename,
				contentType: req.file.mimetype,
				content: data
			});
			file
				.save()
				.then(data => {
					console.log('saved to database');
					return res.status(200).send({ result: 'success' });
				})
				.catch(err => {
					//.includes works only in nodejs Versions > 11
					if (err.message.includes('duplicate key error')) {
						return res.status(400).send({
							message: 'file allready exist'
						});
					}
					res.status(500).send({
						message:
							err.message || 'Some error occurred while creating the file.'
					});
				});
		}
	});
};

let downloadFile = (req, res) => {
	userId = req.query.userId;
	filename = req.query.filename;
	type = req.query.type;
	console.log('========', userId, filename);
	File.findOne({ userId: userId, filename: filename }, (err, result) => {
		if (err) {
			console.log(err);
			return res.status(403).send({ result: 'internal error' });
		}
		if (result) {
			res.contentType(result.contentType);
			res.send(result.content.buffer);
		} else {
			return res
				.status(403)
				.send({ status: 'failed', result: 'please check file name' });
		}
	});
};

let listFiles = (req, res) => {
	// File.find({ userId: req.query.userId }).toArray(function(
	File.find({ userId: req.query.userId }, function(err, result) {
		if (err) return console.log(err);
		var userMap = [];

		userMap = result.map(item => {
			return item.filename;
		});
		return res.status(200).send({ result: userMap });
	});
};

let deletFile = (req, res) => {
	if (req.body.clear) {
		File.deleteMany({ userId: req.body.userId }, function(err) {
			if (err) {
				console.log(err);
				return res.status(403).send({ result: 'failed' });
			} else {
				console.log('Successful deletion');
				return res.status(200).send({ result: 'deleted' });
			}
		});
	} else {
		if (!req.body.filename || !req.body.userId) {
			return res.status(400).send({ result: 'missing params' });
		} else {
			File.deleteOne(
				{ userId: req.body.userId, filename: req.body.filename },
				function(err) {
					if (err) {
						console.log(err);
						return res.status(403).send({ result: 'failed' });
					}
					console.log('Successful deletion');
					return res.status(200).send({ result: 'deleted' });
				}
			);
		}
	}
};

module.exports = {
	uploadfile: uploadfile,
	downloadFile: downloadFile,
	listFiles: listFiles,
	deletFile: deletFile
};
