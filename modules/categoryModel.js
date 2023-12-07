const mongoose = require('mongoose');

// Create Schema:
const categorySchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'Category Required'],
		unique: [true, 'Category must be unique'],
		minlength: [3, "Too short category name"],
		maxlingth: [32, 'Too long category name']
	},

	slug: {
		type: String,
		lowercase: true,
	},
	image: String,

}, { timestamps: true });

// Create Module:
const CategoryModule = mongoose.model('Category', categorySchema);

module.exports = CategoryModule;