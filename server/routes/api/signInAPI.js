const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../../models/user');
const express = require('express');
const router = express.Router();

//api for logging in
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//check if the user is Okay
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');
	//compare password using bcript
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const token = user.generateAuthToken();
	res.send(token);
});
//validate that the email and password are valid
function validate(req) {
	const schema = {
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	};
	return Joi.validate(req, schema);
}
module.exports = router;
