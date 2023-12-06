const mongoose = require('mongoose');

// Create Schema:
const categorySchema = new mongoose.Schema({
	name: String
});

// Create Module:
const CategoryModule = mongoose.model('Category', categorySchema);

module.exports = CategoryModule;