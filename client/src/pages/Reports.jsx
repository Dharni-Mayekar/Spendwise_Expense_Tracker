import {useEffect, useState } from "react";
import {saveAs} from "file-saver";
import API from "../services/api";
import "../styles/common.css";

function Reports() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();

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

    const totalExpense = expenses.reduce(
        (acc, item) => acc + Number(item.amount), 0
    );

    const budget = Number(localStorage.getItem("budget")) || 0;
    
    const remaining = budget - totalExpense;

    const totalTransactions = expenses.length;

    const downloadCSV = () => {
        const headers = "Title,Category,Amount,Date\n";

        const rows = expenses.map((expense) => 
            `${expense.title},${expense.category},${expense.amount},${new Date(expense.date).toLocaleDateString()}`
    );

    const csv = headers + rows.join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "Expense_Report.csv");
    };

     return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
      }}
    >
      <h2
        style={{
          color: "#1E3A8A",
          marginBottom: "25px",
        }}
      >
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

<div style={{ textAlign: "center", marginTop: "30px" }}>
  <button
    onClick={downloadCSV}
    style={{
      background: "#4CB1A1",
      color: "white",
      border: "none",
      padding: "14px 30px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    📄 Download Expense Report
  </button>
</div>

<div
  style={{
    maxWidth: "1100px",
    margin: "0 auto",
  }}
>
  
</div>
    </div>
  );
}

export default Reports;
