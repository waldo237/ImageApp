const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 60,
	},
	username: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 60,
	},
	email: {
		type: String,
		required: true,
		match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() { 
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWTTOKEN);
	return token;
};
module.exports = mongoose.model('User', userSchema); 