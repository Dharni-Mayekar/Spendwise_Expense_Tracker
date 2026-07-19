const Budget = require("../models/Budget");

const getBudget = async (req, res) => {
  console.log("get BUDGET CALLED");
  try {
    const budget = await Budget.findOne({
      user: req.user.id,
    });

    if (!budget) {
      return res.json({ amount: 0 });
    }

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBudget = async (req, res) => {
  console.log("UPDATE BUDGET CALLED");
  try {
    const { amount } = req.body;

    let budget = await Budget.findOne({
      user: req.user.id,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user.id,
        amount,
      });
    }

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBudget,
  updateBudget,
};