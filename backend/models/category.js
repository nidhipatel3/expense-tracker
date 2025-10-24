const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

const Category = model('category', categorySchema);

module.exports = Category;
