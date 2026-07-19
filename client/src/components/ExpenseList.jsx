import API from "../services/api";
import {useState} from "react";


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
<div style={{
    background: "white",
    padding: "20px",
    borderRadius:"10px",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
}}
>
<h2>
  {dashboard ? "Recent Transactions" : "All Expenses"}
</h2>
{!dashboard && (
  <select 
  value={selectedCategory}
  onChange={(e) =>
    setSelectedCategory(e.target.value)
  }
  style={{
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px"
  }}
>
{categories.map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
  
))}</select>
)}


  {!dashboard && (
<input 
type="text" 
placeholder="Search Expense..." 
value= {searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
style ={{ padding: "10px", marginLeft: "10px", borderRadius: "6px" }}/>  
  )}


<table style={{
    width:"100%",
    borderCollapse:"collapse",
    marginTop:"15px"
}}>
    <thead>
        <tr style={{
            background: "#2563EB",
            color: "white"
        }}>
          <th style={{ padding: "12px" }}>Title</th>
          <th style={{ padding: "12px" }}>Category</th>
          <th style={{ padding: "12px" }}>Amount</th>
          <th style={{ padding: "12px" }}>Date</th>
          {!dashboard && <th style={{ padding: "12px" }}>Edit</th>}
          {!dashboard && <th style={{ padding: "12px" }}>Delete</th>}         
        </tr>
    </thead>
    <tbody>
        {
            finalExpenses.map((expense) => (
                <tr key = { expense._id}
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                }}>
                    <td style={{ padding: "12px" }}>
                        {expense.title}
                    </td>

            <td style={{ padding: "12px" }}>
              {expense.category}
            </td>

                        <td
              style={{
                padding: "12px",
                color: "#16A34A",
                fontWeight: "bold"
              }}
            >
              ₹{expense.amount}
            </td>

<td style={{ padding: "12px" }}>
  {new Date(expense.createdAt).toLocaleDateString()}
</td>
{!dashboard && (<td>
  <button
  onClick={() => { 
    
    
    setEditingExpense(expense);
  }}
  style={{
    background: "#F59E0B",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px"
  }}
>
  Edit
</button>
</td>)}

           {!dashboard && ( <td style={{ padding: "12px" }}>
              <button
                onClick={() =>
                  handleDelete(expense._id)
                }
                style={{
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
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
  <div style={{ textAlign: "right", marginTop: "15px" }}>
    <button
      onClick={() => window.location.href = "/expenses"}
      style={{
        background: "#2563EB",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      View All →
    </button>
  </div>
)}


{
  editingExpense && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "white",
        width: "420px",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 25px rgba(0,0,0,0.3)",
      }}
    >
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
        style={{
    width: "95%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    marginBottom: "15px",
  }}
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
  style={{
    width: "95%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    marginBottom: "15px",
  }}
/>

<input type="text" 
value={editingExpense.category}
onChange={(e) => 
  setEditingExpense({
    ...editingExpense,
    category: e.target.value

  })
}
style={{
      width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
  }}
/>

      <br/><br/>
 
<button
  onClick={handleUpdate}
  style={{
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
  }}
>
  Save
</button>

<button
  onClick={() => setEditingExpense(null)}
  style={{
    background: "#6B7280",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
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