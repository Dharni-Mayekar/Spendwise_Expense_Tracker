import {useNavigate } from "react-router-dom";
import "../styles/common.css";

function Profile() {
    const navigate = useNavigate();

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");

    };

return (
  <div
    style={{
      maxWidth: "650px",
      margin: "40px auto",
      background: "var(--surface)",
      color: "var(--text)",
      padding: "35px",
      borderRadius: "16px",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow)",
    }}
  >
    <h2 className="page-title">My Profile</h2>

    <div
      style={{
        marginTop: "30px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h3 style={{ marginBottom: "8px", color: "var(--text-light)" }}>
        Name
      </h3>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "var(--text)",
        }}
      >
        {user?.name}
      </p>
    </div>

    <div
      style={{
        marginTop: "25px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h3 style={{ marginBottom: "8px", color: "var(--text-light)" }}>
        Email
      </h3>

      <p
        style={{
          fontSize: "18px",
          color: "var(--text)",
        }}
      >
        {user?.email}
      </p>
    </div>

    <button
      onClick={handleLogout}
      style={{
        marginTop: "35px",
        width: "100%",
        padding: "14px",
        background: "var(--danger)",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  </div>
);
}

export default Profile;