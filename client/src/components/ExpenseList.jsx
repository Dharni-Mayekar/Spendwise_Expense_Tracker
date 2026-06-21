import API from "../services/api";


function ExpenseList({
    expenses,
    fetchExpenses,
    selectedCategory,
    setSelectedCategory
 }) {

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
          <th style={{ padding: "12px" }}>Action</th>            
        </tr>
    </thead>
    <tbody>
        {
            filteredExpenses.map((expense) => (
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

</div>
);
}


export default ExpenseList;