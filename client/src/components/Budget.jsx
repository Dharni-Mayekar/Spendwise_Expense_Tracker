import { useState } from "react";
import API from "../services/api";
function Budget({ expenses, budget, setBudget, fetchBudget, }) {

const token = localStorage.getItem("token");

  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const remaining = budget - totalExpense;

  const percentage =
    budget > 0
      ? (totalExpense / budget) * 100
      : 0;

  const handleBudgetChange = async (e) => {
    const value = Number(e.target.value);

    setBudget(value);

    try {
      await API.put(
        "/budget",
        {
          amount: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBudget();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="budget-card-main"
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          color: "#1E3A8A",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Monthly Budget
      </h2>

      <input
        type="number"
        placeholder="Set Budget"
        value={budget}
        onChange={handleBudgetChange}
        style={{
          padding: "10px",
          width: "200px",
        }}
      />

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
            width: `${Math.min(percentage, 100)}%`,
            background:
              percentage <= 50
                ? "#22c55e"
                : percentage <= 80
                ? "#f59e0b"
                : "#ef4444",
            height: "100%",
            transition: "width 0.5s",
          }}
        />
      </div>

      <h4
        style={{
          marginTop: "20px",
        }}
      >
        Remaining: ₹ {remaining}
      </h4>

      {percentage > 100 && (
        <p
          style={{
            color: "red",
          }}
        >
          Budget Exceeded!
        </p>
      )}
    </div>
  );
}

export default Budget;