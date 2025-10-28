const Expense = require("../models/expense");

// create expense
async function createExpense(req, res) {
    const { amount, description, category, date } = req.body;

    if (!amount || !description || !category || !date) {
        res.status(400).json({ msg: "All fields are required" });
    }
    try {
        await Expense.create({
            amount,
            description,
            category,
            date
        })
        res.status(200).json({ msg: "expense added successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//update expense
async function updateExpense(req, res) {
    await Expense.findByIdAndUpdate(req.params.id, {
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    })
    res.status(200).json({ msg: "expense updated successfully" });
}

//delete expense
async function deleteExpense(req, res) {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "expense deleted successfully" });
}

// get all expenses
async function getExpenses(req, res) {
    const allExpenses = await Expense.find({});
    return res.json(allExpenses);
}

// get expense using id
async function getExpenseById(req, res) {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404).json({ msg: "expense not found" });
    }
    return res.json(expense);
}

module.exports = {
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
    getExpenseById,
}