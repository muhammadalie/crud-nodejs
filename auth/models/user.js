var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//var mongoDB = 'mongodb://127.0.0.1:27017/myapp';

//mongoose.connect(mongoDB, { useNewUrlParser: true });

var AuthSchema = mongoose.Schema(
	{
		userId: { type: String, required: true, index: true, unique: true },
		password: String
	},
	{
		timestamps: true
	}
);

AuthSchema.plugin(passportLocalMongoose);
module.exports = {
	Auth: mongoose.model('Auth', AuthSchema)
};
