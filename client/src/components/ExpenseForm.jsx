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
  <div className="form-card">
    <h2>Add Expense</h2>

    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <button type="submit">
        Add Expense
      </button>
    </form>
  </div>
);
}

export default ExpenseForm;