import {useEffect, useState } from "react";
import {saveAs} from "file-saver";
import API from "../services/api";
import "../styles/common.css";
import "../styles/reports.css";

function Reports() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchBudget();

    }, []);

    const fetchExpenses = async () => {
        try {

            const token = localStorage.getItem("token");
            console.log(localStorage.getItem("token"));
            const res = await API.get("/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setExpenses(res.data);

        } catch (error) {
            console.log(error);

        }
    };

    const fetchBudget = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/budget", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBudget(res.data.amount);
  } catch (err) {
    console.log(err);
  }
};

    const totalExpense = expenses.reduce(
        (acc, item) => acc + Number(item.amount), 0
    );

const [budget, setBudget] = useState(0);    
    const remaining = budget - totalExpense;

    const totalTransactions = expenses.length;

const downloadCSV = () => {
  const headers = "Title,Category,Amount,Date";

  const rows = expenses.map((expense) => [
    expense.title,
    expense.category,
    expense.amount,
    new Date(expense.date).toLocaleDateString("en-GB"),
  ]);

  const csv = [headers, ...rows.map((row) => row.join(","))].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "application/csv;charset=utf-8;",
  });

  saveAs(blob, "Expense_Report.csv");
};

     return (
   <div className="report-container">
     <h2 className="report-title">
Expense Report
</h2>

  <div className="summary-grid">

  <div className="summary-card expense-card">
    <h3>Total Expense</h3>
    <p>₹ {totalExpense}</p>
  </div>

  <div className="summary-card budget-card">
    <h3>Monthly Budget</h3>
    <p>₹ {budget}</p>
  </div>

  <div className="summary-card savings-card">
    <h3>Remaining</h3>
    <p>₹ {remaining}</p>
  </div>

  <div className="summary-card transaction-card">
    <h3>Transactions</h3>
    <p>{totalTransactions}</p>
  </div>

</div>

<div className="report-download"> <button
className="download-btn"
onClick={downloadCSV}
>
    📄 Download Expense Report
  </button>
</div>
</div>
  );
}

export default Reports;
