import "../styles/analytics.css";
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
   

  return (
    <div>
      
<h2 className="analytics-title">
Expense Analytics
</h2>

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
    outerRadius={100}
    label
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
/>
  </BarChart>
</ResponsiveContainer>
</div>

    </div>
  );
}

export default Analytics;