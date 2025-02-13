const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter username'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter password'],
		},
		email: {
			type: String,
			required: [true, 'Please enter email'],
			unique: true,
		},
		profileImage: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
