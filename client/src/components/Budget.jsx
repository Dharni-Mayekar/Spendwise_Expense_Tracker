import { useState } from "react";

function Budget({ expenses }) {

  const [budget, setBudget] = useState("");

  // TOTAL EXPENSE
  const totalExpense = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // REMAINING
  const remaining = budget - totalExpense;

  // PERCENTAGE
  const percentage =
    budget > 0
      ? (totalExpense / budget) * 100
      : 0;

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >

      <h2>Monthly Budget</h2>

      <input
        type="number"
        placeholder="Set Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
        style={{
          padding: "10px",
          marginTop: "10px",
          width: "200px",
        }}
      />

      <h3 style={{ marginTop: "20px" }}>
        Budget: ₹ {budget || 0}
      </h3>

      <h3>
        Total Expense: ₹ {totalExpense}
      </h3>

      <h3>
        Remaining: ₹ {remaining}
      </h3>

      {/* PROGRESS BAR */}

      <div
        style={{
          background: "#ddd",
          height: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: `${percentage}%`,
            background:
              percentage > 100
                ? "red"
                : "green",
            height: "100%",
          }}
        ></div>

      </div>

      {/* WARNING */}

      {
        percentage > 100 && (
          <p style={{ color: "red" }}>
            Budget Exceeded!
          </p>
        )
      }

    </div>
  );
}

export default Budget;