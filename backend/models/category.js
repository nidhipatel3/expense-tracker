const { Schema, model } = require("mongoose");
require("./user");

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
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
    },
    { timestamps: true }
);

const Category = model('category', categorySchema);

module.exports = Category;
