const Expense = require("../models/Expense");

//add expense
const addExpense = async (req, res) => {
try {
const { title, amount, category } = req.body;

const expense = await Expense.create({
user: req.user._id,
title,
amount,
category,
});

res.status(201).json(expense);

} catch (error) {
res.status(500). json ({
message: error.message,
});
}
};

//get user expenses
const getExpenses = async (req, res) => {
try {
const expenses = await Expense.find({
user: req.user._id,
}).sort({ createdAt: -1 });

res.status(200).json(expenses);

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

//delete expense
const deleteExpense = async (req, res) => {
try {
const expense = await Expense.findById(req.params.id);

if (!expense) {
return res.status(404).json({
message: "Expense not found",
});
}

await expense.deleteOne();
res.status(200).json({
message: "Expense deleted",
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};


const updateExpense = async (req, res) => {
    try {
        const { title, amount, category } = req. body;
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json ({
                message: "expense not found",
            });
        }

        expense.title = title;
        expense.amount = amount;
        expense.category =category;

        await expense.save();

        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            message: error.message,


            });
        
    };
}
module.exports = {
addExpense,
getExpenses,
deleteExpense,
updateExpense,
};