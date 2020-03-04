//Require Mongoose
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/myapp';

const multer = require('multer');

mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
	db: db
};
