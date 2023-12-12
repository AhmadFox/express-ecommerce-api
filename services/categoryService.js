const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ErrorModule  = require('../utils/errorModule');
const CategoryModule = require('../modules/categoryModel');

/**
 * @method: GET
 * @route: /api/v1/categoreis
 * @access: Public
 * @description: Get all category
*/
exports.getCategories = asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page-1) * limit;
	const categories = await CategoryModule.find({}).skip(skip).limit(limit);
	res.status(200).json({ result: categories.length, page, data: categories })
});

/**
 * @method: GET
 * @route: /api/v1/categoreis/:id
 * @access: Public
 * @description: Get specific category by ID
*/
exports.getCategorie = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const category = await CategoryModule.findById(id);
	if(!category) {
		return next(new ErrorModule(`No category for this id ${id}`, 404));
	}
	res.status(200).json({ data: category });
})

/**
 * @method: POST
 * @route: /api/v1/categoreis
 * @access: Private
 * @description: Create category
*/
exports.createCategory = asyncHandler(async (req, res) => {
	const name = req.body.name;
	const category = await CategoryModule.create({
		name: name,
		slug: slugify(name),
	})
	res.status(201).json({ data: category });
});

/**
 * @method: PUT
 * @route: /api/v1/categorei/:id
 * @access: Private
 * @description: Update spisefic category by ID
*/
exports.updateCategory = asyncHandler(async(req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	const category = await CategoryModule.findByIdAndUpdate(
		{ _id: id },
		{ name: name, slug: slugify(name) },
		{ new: true }
	);
	if(!category) {
		return next(new ErrorModule(`No category for this id ${id}`, 404));
	}
	res.status(201).json({ data: category });
});

/**
 * @method: DELETE
 * @route: /api/v1/categorei/:id
 * @access: Private
 * @description: Delete spisefic category by ID
*/
exports.deleteCategory = asyncHandler(async(req, res, next) => {
	const { id } = req.params;

	const category = await CategoryModule.findByIdAndDelete(id);
	if(!category) {
		return next(new ErrorModule(`No category for this id ${id}`, 404));
	}
	res.status(201).json({ data: category });
});