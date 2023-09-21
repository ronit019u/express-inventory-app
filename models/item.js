const { Schema, model } = require('mongoose');

const ItemSchema = new Schema ({
    name: { type: String, required: true, maxlength: 30},
    
    description: { type: String, required: true, maxlength: 30},
    
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
});

ItemSchema.virtual("url").get( function () {
    return `/item/${this._id}`;
});

module.exports = model('Item', ItemSchema);