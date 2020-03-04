var express = require('express');
var router = express.Router();

const notes = require('../controllers/note');

// Create a new Note
router.post('/create/', notes.create);

// Retrieve all Notes
//router.get('/notes', notes.findAll);

// Retrieve a single Note with noteId
router.get('/get/', notes.getNote);
router.get('/list/', notes.findAll);

// Update a Note with noteId
router.put('/notes/', notes.update);

// Delete a Note with noteId
router.post('/remove/', notes.remove);

module.exports = router;
