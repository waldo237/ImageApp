const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	length: Number,
	chunkSize: Number,
	uploadDate: Date,
	filename: String,
	md5: String,
	contentType: String,

});

exports.File = mongoose.model('File', fileSchema);

const ObjectId = mongoose.Schema.ObjectId;
const chunkSchema = new mongoose.Schema({
	files_id: ObjectId,
	n: Number,
	data: Buffer
});

exports.Chunk = mongoose.model('Chunk', chunkSchema);