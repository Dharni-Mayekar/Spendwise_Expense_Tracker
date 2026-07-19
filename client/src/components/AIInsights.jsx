function AIInsights({ expenses }) {

  // TOTAL EXPENSE
  const totalExpense = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // CATEGORY ANALYSIS
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  // HIGHEST CATEGORY
  let highestCategory = "";
  let highestAmount = 0;

  for (let category in categoryTotals) {
    if (categoryTotals[category] > highestAmount) {
      highestAmount = categoryTotals[category];
      highestCategory = category;
    }
  }

  // SMART INSIGHT
  let spendingInsight = "";

  if (expenses.length === 0) {
    spendingInsight = "No expenses recorded yet.";
  } else if (totalExpense < 1000) {
    spendingInsight =
      "Your spending is very low this month. Great job managing expenses!";
  } else if (totalExpense < 5000) {
    spendingInsight =
      "Your spending is under control. Keep tracking your expenses regularly.";
  } else if (totalExpense < 10000) {
    spendingInsight =
      "Monitor your spending carefully. You are entering a higher spending range.";
  } else {
    spendingInsight =
      "Your expenses are quite high this month. Consider reducing unnecessary spending.";
  }

  return (
    <div className="budget-card-main">
      <h2
  style={{
    color: "#1E3A8A",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
  AI Financial Insights
</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <>
          {/* INSIGHT 1 */}
          <p>
            Highest spending category:
            <strong>
              {" "}
              {highestCategory}
            </strong>{" "}
            (₹{highestAmount})
          </p>

          {/* INSIGHT 2 */}
          <p>{spendingInsight}</p>

          {/* INSIGHT 3 */}
          {highestAmount > 2000 && (
            <p>
              Consider reducing{" "}
              <strong>{highestCategory}</strong>{" "}
              expenses to improve savings.
            </p>
          )}

          {/* INSIGHT 4 */}
          <p>
            Total expenses this month:
            <strong> ₹{totalExpense}</strong>
          </p>

          {/* INSIGHT 5 */}
          <p>
            You have recorded{" "}
            <strong>{expenses.length}</strong>{" "}
            transactions so far.
          </p>
        </>
      )}
    </div>
  );
}

export default AIInsights;