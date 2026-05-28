import API from "../services/api";
function ExpenseList({ expenses, fetchExpenses }) {
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

return (
<div>
<h2>Your Expenses</h2>
{
expenses.map((expense) => (
<div key={expense._id}
style={{
 border: "1px solid gray",
 margin: "10px",
 padding: "10px",
 }}>

<h3>{expense.title}</h3>
<p>₹ {expense.amount}</p>
<p>{expense.category}</p>

<button onClick={ () => handleDelete(expense._id) }>Delete</button>
</div>
))
}
</div>
);
}

export default ExpenseList;