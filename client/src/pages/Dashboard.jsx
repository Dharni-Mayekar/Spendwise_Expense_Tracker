import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Analytics from "../components/Analytics";
import Budget from "../components/Budget";
import AIInsights from "../components/AIInsights";

function Dashboard() {
const [expenses, setExpenses] = useState([]);
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

return (
<div>
<Navbar />
<Analytics expenses={expenses} />
<Budget expenses={expenses} />
<AIInsights expenses={expenses} />
<ExpenseForm fetchExpenses={fetchExpenses} />
<ExpenseList 
expenses={expenses}
fetchExpenses={fetchExpenses}
/>
</div>
);
}



export default Dashboard;