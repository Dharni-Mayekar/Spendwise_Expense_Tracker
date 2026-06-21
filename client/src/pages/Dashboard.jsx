import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Analytics from "../components/Analytics";
import Budget from "../components/Budget";
import AIInsights from "../components/AIInsights";
import "../styles/dashboard.css";

function Dashboard() {
const [expenses, setExpenses] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");

const fetchExpenses = async () => {
try {
const token = localStorage.getItem("token");
const res = await API.get(
"/expenses",
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

setExpenses(res.data);

} catch (error) {
console.log(error);
}
};

useEffect(() => {
fetchExpenses();
}, []);

const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount), 0
);

return (
    <>
    <Navbar />
<div className="dashboard-cards">

<div className = "card expense-card">
<h3>Total Expense</h3>
<p>₹ {totalExpense}</p>
</div>

<div className="card budget-card">
<h3>Monthly Budget</h3>
<p>₹ 1000</p>
</div>

<div className="card savings-card">
<h3>Remaining</h3>
<p>₹ {1000 - totalExpense}</p>
</div>
</div>
<Analytics expenses = {expenses} />
<Budget expenses={expenses}/>
<AIInsights expenses={expenses} />
<ExpenseForm fetchExpenses={fetchExpenses} />
<ExpenseList expenses={expenses} 
fetchExpenses={fetchExpenses}
selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}
/>
</>
);
}



export default Dashboard;