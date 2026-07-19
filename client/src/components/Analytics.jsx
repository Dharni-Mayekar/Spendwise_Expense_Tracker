import "../styles/analytics.css";
import "../styles/common.css";

import {
  PieChart, Pie, Bar,
  Cell, Tooltip, 
  Legend, BarChart,
  ResponsiveContainer, LineChart,
  Line, XAxis, YAxis, CartesianGrid,
} from "recharts";

function Analytics({ expenses }) {


  const COLORS = [
  "#4cb1a1",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#10B981",
];


  const months = ["Jan", "Feb", "Mar", "Apr","May","Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyData = [];
    
    expenses.forEach((expense) => {
      const d = new Date(expense.date);

      const month = months[d.getMonth()];

      const existingMonth = monthlyData.find(
        (item) => item.month === month ); 

      if (existingMonth) {
        existingMonth.amount += Number(expense.amount);
      } else {
        monthlyData.push({
          month,
          amount: Number(expense.amount),
        
        });
        monthlyData.sort(
    (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
);
      }
      });
     


      const categoryData = [];

      expenses.forEach((expense) => {
       const category = expense.category;
       
       const existingCategory = categoryData.find(
        (item) => item.category === category
       ); 

      if (existingCategory) {
        existingCategory.amount += Number(expense.amount);
      } else {
        categoryData.push({
          category,
          amount: Number(expense.amount),
        });
      }

    });

      
        categoryData.sort(
    (a, b) => b.amount - a.amount);


const totalExpense = expenses.reduce(
  (acc, expense) => acc + Number(expense.amount),
  0
);

const totalTransactions = expenses.length;

const averageExpense =
  expenses.length > 0
    ? (totalExpense / expenses.length).toFixed(2)
    : 0;

let highestCategory = "";
let highestAmount = 0;

categoryData.forEach((item) => {
  if (item.amount > highestAmount) {
    highestAmount = item.amount;
    highestCategory = item.category;
  }
});

  return (
<div className="analytics-container">
      
<h2 className="analytics-title">
Expense Analytics
</h2>
<div className="summary-grid">

  <div className="summary-card">
    <h3>Total Expense</h3>
    <p>₹ {totalExpense}</p>
  </div>

  <div className="summary-card">
    <h3>Transactions</h3>
    <p>{totalTransactions}</p>
  </div>

  <div className="summary-card">
    <h3>Average Expense</h3>
    <p>₹ {averageExpense}</p>
  </div>

  <div className="summary-card">
    <h3>Highest Category</h3>
    <p>
  {highestCategory} (₹ {highestAmount})
</p>
  </div>

</div>

<div className="chart-card">
  <h3 className="chart-title">
    Category Distribution
  </h3>
    <ResponsiveContainer width="100%" height={350}>
        <PieChart>

    <Pie
      data={categoryData}
  dataKey="amount"
  nameKey="category"
  outerRadius={120}
  label={({ category, percent }) =>
    `${category} ${(percent * 100).toFixed(0)}%`
  }
          >

            {
              categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))
            }
            

          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>

      <div className="chart-card">
    <h3 className="chart-title">
     Monthly Spending Trend
    </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month"/>
          <YAxis />
          <Tooltip />
        <Line
  type="monotone"
  dataKey="amount"
  stroke="#4cb1a1"
  strokeWidth={3}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
/>
        </LineChart>
      </ResponsiveContainer>
      </div>
    
    <div className="chart-card">
    <h3 className="chart-title">
     Category-wise Spending
    </h3>
    <ResponsiveContainer width="100%" height={400}>
  <BarChart data={categoryData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
 <Bar
  dataKey="amount"
  fill="#4cb1a1"
  radius={[8, 8, 0, 0]}
/>
  </BarChart>
</ResponsiveContainer>
</div>

    </div>
  );
}

export default Analytics;