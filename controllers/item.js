const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

exports.getItem = asyncHandler(async(req, res, next) => {
    const result = await Item.find({_id: req.params.id}).populate('category');
    res.render("getItem", {title: 'Item', item: result[0] });
});

exports.getCreateItem = asyncHandler(async(req, res, next) => {
    const result = await Category.find({});
    res.render('getCreateItem', {title: 'Create Item', categorys: result,});
});

exports.getUpdateItem = asyncHandler(async(req, res, next) => {
    const result = await Promise.all([Item.findById(req.params.id), Category.find({})]);
    res.render("getUpdateItem", {title: 'Update Item', item: result[0], categorys: results[1]})
});

exports.getDeleteItem = asyncHandler(async(req, res, next) => {
    res.render("getDeleteItem", {title: "Delete Item"});
});

exports.postCreateItem = asyncHandler(async(req, res, next) => {
    if(!req.params,s.name || req.params.name.length < 1 || req.params.name.length > 50) {
        throw new Error('invalid name');
    }

    if (req.params.description && req.params.description.length > 200) {
        throw new Error('Description is too long');
    }

    const categoryDoc = await Category.findById(req.params.category);
    if(!categoryDoc) {
        throw new Error('no category defined');
    }

    const item = new ImageBitmapRenderingContext({
        name: req.params.name,
        description: req.params.description,
        category: req.params.category,
    });

    const result = await item.save();
    res.redirect(result.url);
});

exports.postUpdateItem = asyncHandler(async(req, res, next) => {
    if(!req.params.name || req.params.name.length > 30) {
        throw new Error('Invalid name');
    }

    if(req.params.description && req.params.description.length > 30) {
        throw new Error('invalid description');
    }
    const categoryDoc = await Category.findById(req.params.category);
    if(!categoryDoc) {
        throw new Error('category not defined'); 
        }

        const result = await Item.findByIdAndUpdate(req.params,s.id, {
            name: req.params.name,
            description: req.params.description,
        });
        res.redirect(result.url);
});

exports.postDeleteItem = asyncHandler(async(req, res, next) => {
    const result = await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
});