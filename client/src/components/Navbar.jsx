import "../styles/navbar.css";
import { useTheme } from "../context/ThemeContext";
function Navbar() {
    const { darkMode, toggleTheme } = useTheme();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>{greeting}, {user?.name || "Guest"} 👋</h2>
        <p>Manage your finances smarter.</p>
      </div>

      <div className="navbar-right">
        🔔
        <div className="profile">
          {user?.name?.charAt(0).toUpperCase() || "G"}
        </div>
        <button
  onClick={toggleTheme}
  style={{
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    marginRight: "15px",
  }}
>
  {darkMode ? "☀️" : "🌙"}
</button>
      </div>
    </div>
  );
}

export default Navbar;