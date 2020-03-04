const mongoose = require('mongoose');

var UserSchema = mongoose.Schema(
	{
		userId: { type: String, required: true, index: true, unique: true },
		password: { type: String, required: true, index: true },
		firstName: String,
		lastName: String,
		address: String
	},
	{
		timestamps: true
	}
);

module.exports = {
	User: mongoose.model('User', UserSchema)
};
