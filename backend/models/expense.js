const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
    {
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
            ref: "Category",
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        }
    }, { timestamps: true }
);

const Expense = model('expense', expenseSchema);

module.exports = Expense;