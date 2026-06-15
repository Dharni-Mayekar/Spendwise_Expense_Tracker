import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics({ expenses }) {

  // CATEGORY TOTALS
  const categoryData = [];

  const categories = {};

  expenses.forEach((expense) => {

    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }

  });

  for (let category in categories) {
    categoryData.push({
      name: category,
      value: categories[category],
    });
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >

      <h2
  style={{
    color: "#1E3A8A",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
Expense Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
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
  );
}

export default Analytics;