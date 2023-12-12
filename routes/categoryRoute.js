const express = require('express');

const { 
	getCategoryValidator,
	createCategoryValidator,
	updateCategoryValidator,
	deleteCategoryValidator
} = require('../utils/validators/categoryValidator');

const { 
	getCategories, 
	createCategory, 
	getCategorie, 
	updateCategory,
	deleteCategory
} = require('../services/categoryService');


const router = express.Router();

router
	.route('/')
	.get(getCategories)
	.post(createCategoryValidator, createCategory);

router
	.route('/:id')
	.get(getCategoryValidator, getCategorie)
	.put(updateCategoryValidator, updateCategory)
	.delete(deleteCategoryValidator, deleteCategory);

module.exports = router;