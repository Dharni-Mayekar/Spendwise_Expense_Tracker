import { useState } from "react";
import API from "../services/api";

function ExpenseForm({ fetchExpenses }) {
const [formData, setFormData] = useState({
title: "",
amount: "",
category: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
const token = localStorage.getItem("token");
await API.post(
"/expenses",
formData,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

setFormData({
title: "",
amount: "",
category: "",
});

fetchExpenses();

} catch (error) {
console.log(error);
}
};

return (
<div>
<h2>Add Expense</h2>
<form onSubmit={handleSubmit}>
<input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
<br/><br/>
<input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
<br/><br/>

<input
  type="text"
  name="category"
  placeholder="Enter Category"
  value={formData.category}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  }}
/>
<br/><br/>
<button type="submit">Add Expense</button>
</form>
</div>
);
}

export default ExpenseForm;