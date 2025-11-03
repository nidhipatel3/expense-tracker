const { Router } = require("express");
const { createExpense, getExpenses, updateExpense, deleteExpense, getExpenseById } = require("../controllers/expense");

const router = Router();

router.post('/addExpense', createExpense);
router.get('/getExpenses', getExpenses);
router.route('/:id')
    .patch(updateExpense)
    .delete(deleteExpense)
    .get(getExpenseById);

module.exports = router;