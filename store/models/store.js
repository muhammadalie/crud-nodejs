const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
	{
		userId: { type: String, required: true, index: true },
		title: { type: String, required: true, index: true },
		content: String
	},
	{
		timestamps: true
	}
);
NoteSchema.index({ userId: 1, title: 1 }, { unique: true });

const FileSchema = mongoose.Schema(
	{
		userId: { type: String, required: true, index: true },
		filename: { type: String, required: true, index: true },
		contentType: String,
		content: mongoose.Mixed
	},
	{
		timestamps: true
	}
);

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// module.exports = {
// 	db: db
// };

module.exports = {
	Notes: mongoose.model('Note', NoteSchema),
	Files: mongoose.model('Files', FileSchema)
};
