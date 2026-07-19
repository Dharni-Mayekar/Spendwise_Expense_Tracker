import { useEffect, useState } from "react";
import API from "../services/api";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Analytics from "../components/Analytics";
import Budget from "../components/Budget";
import AIInsights from "../components/AIInsights";

import "../styles/dashboard.css";
import "../styles/common.css";

function Dashboard() {
const [expenses, setExpenses] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const [budget, setBudget] = useState(0);

const token = localStorage.getItem("token");
 const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const fetchBudget = async () => {
  try {
    const res = await API.get("/budget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Budget API Response:", res.data);

    setBudget(res.data.amount);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchExpenses();
    fetchBudget();
  }, []);

  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );

  const remaining = budget - totalExpense;

  const totalTransactions = expenses.length;

  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card expense-card">
          <h3>Total Expense</h3>
          <p style={{color:"#ef4444"}}>₹ {totalExpense}</p>
        </div>

        <div className="card budget-card">
          <h3>Monthly Budget</h3>
          <p style={{color:"#2563eb"}}>₹ {budget}</p>
        </div>

        <div className="card savings-card">
          <h3>Remaining</h3>
          <p
style={{
color:remaining>=0?"#22c55e":"#ef4444"
}}
>
₹ {remaining}
</p>
        </div>

        <div className="card transaction-card">
          <h3>Total Transactions</h3>
          <p style={{color:"#9333ea"}}>
{totalTransactions}
</p>
        </div>
      </div>

      <Budget
        expenses={expenses}
        budget={budget}
        setBudget={setBudget}
        fetchBudget={fetchBudget}
      />

      <AIInsights expenses={expenses} />

      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dashboard={true}
      />
    </>
  );
}

export default Dashboard;