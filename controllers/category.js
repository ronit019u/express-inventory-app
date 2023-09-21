const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");

exports.getCategory = asyncHandler( async (req, res, next) => {
    const [items, category] = await Promise.all([
        Item.find({category: req.params.id }),
        Category.findById(req.params.id),
    ]);

    res.render('getCategory', {
        title: 'Category',
        items,
        category,
    });
});

exports.getCreateCategory = asyncHandler(async(req, res, next) => {
res.render( 'getCreateCategory',{ title: 'Create Category'});
});

exports.getUpdateCategory = asyncHandler(async( req, res, next) => {
    const category = await Category.findById(req.params.id);

    res.render('getUpdateCategory', { title: 'Update Category', category});
});

exports.getDeleteCategory = asyncHandler(async( rew, res, nexy) => {
    const category = await Category.findById(req.params.id);

    res.render('getDeleteCategory', { title: 'Delete Category'})
})
 
exports.postCreateCategory = asyncHandler( async(req, res, next) => {
    try {
        const category = new Category({
            nmae: req.query.name,
            description: req.query.description || '',
        });
        await category.save();
        res.redirect(category.url);
    } catch (error) {
        next(error);
    }
});

exports.postUpdateCategory = asyncHandler( async(req, res, next) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.query.name,
            description: req.query.description,
        });
        const result = await Category.findById(req.params.id);
        res.redirect(result.url);
    } catch (error) {
        next(error);
    }
});

exports.postDelete = asyncHandler(async(req, res, next) => {
    try {
        const items = await Item.find({category: req.params.id});
        if(Item.length !== 0) {
            throw new Error('You delete it all');
        } 
        await Category.findByIdAndDelete(req.params.id);
        res.redirct('/');
    } catch(error) {
        next(error);
    }
});