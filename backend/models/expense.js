const { Schema, model } = require("mongoose");
require("./category");
require("./user");

const expenseSchema = new Schema(
    {
        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
    }, { timestamps: true }
);

const Expense = model('expense', expenseSchema);

module.exports = Expense;