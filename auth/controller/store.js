const store = require('./store-server');
const httpProxy = require('express-http-proxy');

let createNote = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId,
		content: req.body.content,
		title: req.body.title
	};
	try {
		let note = await store.noteCreate(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let getNote = async (req, res) => {
	let userId = req.user.username;

	let data = {
		userId: userId,
		title: req.query.title
	};
	try {
		let note = await store.noteGet(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let updateNote = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId,
		title: req.body.title,
		content: req.body.content
	};
	try {
		let note = await store.noteUpdate(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let listNote = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId
	};
	try {
		let note = await store.noteList(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let removeNote = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId,
		clear: req.body.clear,
		title: req.body.title
	};
	try {
		let note = await store.noteRemove(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

let removeFile = async (req, res) => {
	let userId = req.user.username;
	let data = {
		userId: userId,
		clear: req.body.clear,
		filename: req.body.filename
	};
	try {
		let note = await store.fileRemove(data);
		if (note.statusCode !== 200) {
			return res.status(note.statusCode).send({ result: 'faild' });
		}
		return res.status(note.statusCode).send(JSON.parse(note.data));
	} catch (error) {
		console.log('Error create note: ', error);
		return res.status(500).send({ message: 'failed' });
	}
};

module.exports = {
	createNote: createNote,
	getNote: getNote,
	listNote: listNote,
	updateNote: updateNote,
	removeNote: removeNote,
	removeFile: removeFile
};
