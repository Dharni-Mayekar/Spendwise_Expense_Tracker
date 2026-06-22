import API from "../services/api";
import {useState} from "react";


function ExpenseList({
    expenses,
    fetchExpenses,
    selectedCategory,
    setSelectedCategory
 }) {

  const [editingExpense, setEditingExpense] =
  useState(null);
    const [searchTerm, setSearchTerm] =
    useState("");

    console.log(expenses[0]);
console.log(selectedCategory);

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
    

return (
<div style={{
    background: "white",
    padding: "20px",
    borderRadius:"10px",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
}}
>
<h2>Recent Transactions</h2>
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
  <option value="All">All Categories</option>
  <option value="food">Food</option>
  <option value="travel">Travel</option>
  <option value="shopping">Shopping</option>
  <option value="bills">Bills</option>
  <option value="entertainment">Entertainment</option>
</select>
  <input 
type="text" 
placeholder="Search Expense..." 
value= {searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
style ={{ padding: "10px", marginLeft: "10px", borderRadius: "6px" }}/>  


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
          <th style={{ padding: "12px" }}>Edit</th>
          <th style={{ padding: "12px" }}>Delete</th>            
        </tr>
    </thead>
    <tbody>
        {
            searchedExpenses.map((expense) => (
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
<td>
  <button
  onClick={() => setEditingExpense(expense)}
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
</td>

            <td style={{ padding: "12px" }}>
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
            </td>
          </tr>
            ))
        }
    </tbody>
</table>
{
  editingExpense && (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "35%",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px gray"
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
    width: "100%",
    padding: "10px"
  }}
      />

      <br /><br />

      <input
        type="number"
        value={editingExpense.amount}
        onChange={(e) =>
          setEditingExpense({
            ...editingExpense,
            amount: e.target.value
          })
        }
        style={{
    width: "100%",
    padding: "10px"
  }}
      />

      <br /><br />

      <button>
        Save
      </button>

      <button
        onClick={() =>
          setEditingExpense(null)
        }
      >
        Cancel
      </button>
    </div>
  )
}
</div>
);
}


export default ExpenseList;