const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema(
	{
		name: String,
		communityNum: Number,
		userNum: Number,
	},
	{ collection: 'Counter' }
);

const Counter = mongoose.model('Counter', counterSchema);
module.exports = { Counter };