import API from "../services/api";
import {useState} from "react";
import "../styles/expense.css";

function ExpenseList({
    expenses,
    fetchExpenses,
    selectedCategory,
    setSelectedCategory,
    dashboard = false,
 }) {

  const [editingExpense, setEditingExpense] =
  useState(null);
    const [searchTerm, setSearchTerm] =
    useState("");

const handleDelete = async (id) => {
try {

const token = localStorage.getItem("token");
await API.delete(
`/expenses/${id}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

fetchExpenses();

} catch (error) {
console.log(error);
}
};

const handleUpdate = async () => {
  try {
    const token = localStorage.getItem('token');

    await API.put(
      `/expenses/${editingExpense._id}`,
      {
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchExpenses();
    setEditingExpense(null);

  } catch (error) {
    console.log(error);
  }
};


const filteredExpenses =
  selectedCategory === "All"
    ? expenses
    : expenses.filter(
        (expense) =>
          expense.category === selectedCategory
      );
      
const searchedExpenses = filteredExpenses.filter(
  (expense) => 
    expense.title.toLowerCase().includes(
      searchTerm.toLowerCase()));

const finalExpenses = dashboard
  ? [...searchedExpenses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
  : searchedExpenses;

const categories = [
  "All",
  ...new Set(expenses.map((expense) => expense.category))
];

  
return (
<div className="expense-container">
<h2 className="expense-title">
  {dashboard ? "Recent Transactions" : "All Expenses"}
</h2>
{!dashboard && (
  <div className="expense-toolbar">
    <select
      className="expense-select"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <input
      className="expense-search"
      type="text"
      placeholder="Search Expense..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
)} 
  


<table className="expense-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Date</th>

      {!dashboard && <th>Edit</th>}
      {!dashboard && <th>Delete</th>}
    </tr>
  </thead>

  <tbody>
        {
            finalExpenses.map((expense) => (
                <tr key = { expense._id}
                >
<td>{expense.title}</td>

<td>{expense.category} </td>

<td className="amount">
₹{expense.amount}
</td>

<td>{new Date(expense.createdAt).toLocaleDateString()}
</td>
{!dashboard && (<td>
<button
  className="edit-btn"
  onClick={() => setEditingExpense(expense)}
>
  Edit
</button>
</td>)}

 {!dashboard && ( <td style={{ padding: "12px" }}>
<button
  className="delete-btn"
  onClick={() => handleDelete(expense._id)}
>
  Delete
</button>
            </td>)}
          </tr>
            ))
        }
    </tbody>
</table>

{dashboard && (
<div className="action-right">
  <button
  className="view-btn"
  onClick={() => (window.location.href = "/expenses")}
>
  View All →
</button>
  </div>
)}


{
  editingExpense && (
<div className="modal-overlay">
<div className="modal-card">
      <h3>Edit Expense</h3>

      <input
        type="text"
        value={editingExpense.title}
        onChange={(e) =>
          setEditingExpense({
            ...editingExpense,
            title: e.target.value
          })
        }
className="modal-input"
      />

      <br /><br />

<input
  type="number"
  value={editingExpense.amount}
  onChange={(e) =>
    setEditingExpense({
      ...editingExpense,
      amount: e.target.value,
    })
  }
  className="modal-input"
/>

<input type="text" 
value={editingExpense.category}
onChange={(e) => 
  setEditingExpense({
    ...editingExpense,
    category: e.target.value

  })
}
className="modal-input"
/>

      <br/><br/>
 
<button className="save-btn" onClick={handleUpdate}>
  Save
</button>

<button
  className="cancel-btn"
  onClick={() => setEditingExpense(null)}
>
  Cancel
</button>
    </div>
    </div>
  )
}
</div>
);
}


export default ExpenseList;