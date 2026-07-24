import { useState } from "react";
import API from "../services/api";
import "../styles/budget.css";
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
   <div className="budget-card-main">
      <h2 className="budget-title">
        Monthly Budget
      </h2>

     <input
className="budget-input"
type="number"
placeholder="Set Budget"
value={budget}
onChange={handleBudgetChange}
/>

      <div className="progress-bar">
      <div
className="progress-fill"
style={{
width:`${Math.min(percentage,100)}%`,
background:
percentage<=50
?"var(--success)"
:percentage<=80
?"var(--warning)"
:"var(--danger)"
}}
/>
      </div>

      <h4 className="remaining-text">
        Remaining: ₹ {remaining}
      </h4>

      {percentage > 100 && (
       <p className="budget-warning">
          Budget Exceeded!
        </p>
      )}
    </div>
  );
}

export default Budget;