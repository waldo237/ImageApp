const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	brand: {
		type: String,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	category: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 80,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 4,
		maxlength: 200,
	},
	price: {
		type: Number,
		required: true,
	},
	cost: {
		type: Number,
	},
	image: String,
});

exports.Product = mongoose.model('Product', productSchema);