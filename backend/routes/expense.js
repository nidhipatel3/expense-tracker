const { Router } = require("express");
const { createExpense, getExpenses, updateExpense, deleteExpense, getExpenseById } = require("../controllers/expense");
const { requireAuth } = require("../middlewares/authentication");

const router = Router();

router.post('/addExpense', requireAuth, createExpense);
router.get('/getExpenses', requireAuth, getExpenses);
router.route('/:id')
    .patch(requireAuth, updateExpense)
    .delete(requireAuth, deleteExpense)
    .get(requireAuth, getExpenseById);

module.exports = router;