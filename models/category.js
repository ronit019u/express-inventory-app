const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: { type: String, required: true, maxlength: 30},
    description: { type: String, required: true, maxlength: 30},
});

CategorySchema.virtual("url").get(function () {
    return `category/${this._id}`;
});

module.exports = model('Category', CategorySchema);