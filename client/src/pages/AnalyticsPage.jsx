
import Analytics from "../components/Analytics";
import "../styles/common.css";

import { useEffect, useState } from "react";

import API from "../services/api";

function AnalyticsPage() {
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
            <h1>Analytics</h1>
<>

<Analytics expenses={expenses} />
</>
        </div>
    )
}

export default AnalyticsPage;