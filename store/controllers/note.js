const models = require('../models/store');
const Note = models.Notes;

// Create and Save a new Note
let create = (req, res) => {
	let params = req.body;
	if (!params.userId || !params.title) {
		return res.status(404).send({
			message: 'missing parameters'
		});
	} else {
		// Validate request
		if (!req.body.content) {
			return res.status(400).send({
				message: 'Note content can not be empty'
			});
		}

		// Create a Note
		const note = new Note({
			userId: req.body.userId,
			title: req.body.title || 'Untitled Note',
			content: req.body.content
		});

		// Save Note in the database
		note
			.save()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				//.includes works only in nodejs Versions > 11
				if (err.message.includes('duplicate key error')) {
					return res.status(200).send({
						message: 'note allready exist'
					});
				}
				res.status(500).send({
					message: err.message || 'Some error occurred while creating the Note.'
				});
			});
	}
};

// Retrieve and return all notes from the database.
let findAll = (req, res) => {
	let params = req.query;
	if (!params.userId) {
		return res.status(404).send({
			message: 'missing parameters'
		});
	} else {
		Note.find({ userId: params.userId })
			.then(notes => {
				res.send(notes);
			})
			.catch(err => {
				res.status(500).send({
					message: err.message || 'Some error occurred while retrieving notes.'
				});
			});
	}
};

// Find a single note with a noteId
let getNote = (req, res) => {
	console.log('11query1', req.query);
	console.log('11body1', req.body);
	console.log('params', req.params);
	let params = req.query;
	if (!params.userId) {
		return res.status(404).send({
			message: 'Please Provide userId'
		});
	} else {
		Note.findOne({ userId: params.userId, title: params.title })
			.then(note => {
				if (!note) {
					return res.status(404).send({
						message: 'Note not found'
					});
				}
				res.send(note);
			})
			.catch(err => {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'Note not found'
					});
				}
				return res.status(500).send({
					message: 'Error retrieving note'
				});
			});
	}
};

// Update a note identified by the noteId in the request
let update = (req, res) => {
	// Validate Request
	console.log('======1111=======>', req.body);
	console.log('======222=======>', req.query);
	console.log('======3333=======>', req.params);
	if (!req.body.content) {
		return res.status(400).send({
			message: 'Note content can not be empty'
		});
	}
	const data = {
		content: req.body.content
	};
	// Find note and update it with the request body
	Note.updateOne({ userId: req.body.userId, title: req.body.title }, data)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'Note not found'
				});
			}
			return res.status(200).send({
				message: 'updated success'
			});
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Note not found'
				});
			}
			return res.status(500).send({
				message: 'Error retrieving user' + err
			});
		});
};

// Delete a note with the specified noteId in the request
let remove = (req, res) => {
	console.log('11query1', req.query);
	console.log('11body1', req.body);
	let params = req.body;
	params.clear = params.clear.toLowerCase() == 'true' ? true : false;
	if (!params.userId) {
		return res.status(404).send({
			message: 'missing parameters'
		});
	} else {
		if (params.clear) {
			Note.deleteMany({ userId: params.userId })
				.then(note => {
					if (!note) {
						return res.status(404).send({
							message: 'Note not found with id '
						});
					}
					if (note.deletedCount == 0) {
						return res.status(404).send({ message: 'Note not found' });
					}
					return res.send({ message: 'all notes are deleted successfully!' });
				})
				.catch(err => {
					if (err.kind === 'ObjectId' || err.name === 'NotFound') {
						return res.status(404).send({
							message: 'Note not found'
						});
					}
					return res.status(500).send({
						message: 'Could not delete note'
					});
				});
		} else {
			if (!params.title) {
				return res.status(404).send({
					message: 'missing parameters'
				});
			}
			Note.deleteOne({ userId: params.userId, title: params.title })
				.then(note => {
					if (!note) {
						return res.status(404).send({
							message: 'Note not found'
						});
					}
					console.log('----------', note);
					if (note.deletedCount == 0) {
						return res.status(404).send({ message: 'Note not found' });
					}
					return res.send({ message: 'Note deleted successfully!' });
				})
				.catch(err => {
					if (err.kind === 'ObjectId' || err.name === 'NotFound') {
						return res.status(404).send({
							message: 'Note not found'
						});
					}
					return res.status(500).send({
						message: 'Could not delete not '
					});
				});
		}
	}
};

module.exports = {
	create: create,
	findAll: findAll,
	getNote: getNote,
	update: update,
	remove: remove
};
