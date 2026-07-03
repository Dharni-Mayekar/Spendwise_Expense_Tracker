import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useEffect, useState } from "react";

import API from "../services/api";

function Expenses() {
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

    return (
        <div style={{ padding: "30px"}}>
            <h1>Expenses</h1>
<>
<ExpenseForm fetchExpenses={fetchExpenses} />
<ExpenseList expenses={expenses} 
fetchExpenses={fetchExpenses}
selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}
/>
</>
        </div>
    )
}

export default Expenses;