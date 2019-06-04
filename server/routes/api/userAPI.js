const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const mongodb = require('mongodb');
// This server gets a specific user R
router.get('/:id', auth, async (req, res) => {
	const id = new mongodb.ObjectID(req.params.id);
	try {
		const user = await User.findById(id);
		res.status(200).send(user);
	}
	catch (ex) {
		res.status(400).send(ex);
	}
});

// edit a specific user U
router.put('/:id',auth, async(req, res) => {
	const qry = {_id: req.params.id};
	const doc = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.psw,
	};
	User.updateOne(qry, doc, (err, respRaw)=>{
		if(err) return res.status(400).send('Could not update');
		res.status(200).json(respRaw);
	});
});

// post a new user to the data base C
router.post('/', async (req, res) => {
	try {
		const user = await new User(req.body);
		// check if the user already exists
		let userTaken = await User.findOne({ email: req.body.email });
  		if (userTaken) return res.status(400).send('Email already in use.');	
		//Generate salt
		const salt = await bcrypt.genSalt(10);
		//generate hash with password and salt
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();
		//immediately force token into the header
		const token = user.generateAuthToken();
		res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
		res.status(201).send(user);
	}
	catch (ex) {
		res.status(400).send(ex);
	}
});

// This function deletes a specific user D
router.delete('/:id',auth, async (req, res) => {
	try {
		await User.deleteOne({_id: req.params.id})
			.exec(()=>{res.status(200).send('deleted');});
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
