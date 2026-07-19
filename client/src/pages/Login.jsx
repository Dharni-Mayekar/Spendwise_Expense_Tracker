import { useState } from "react";
import {Link,  useNavigate } from "react-router-dom";
import API from "../services/api";


function Login() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
const res = await API.post(
"/auth/login",
formData
);

localStorage.setItem(
"token",
res.data.token
);
localStorage.setItem(
    "user",
    JSON.stringify({
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,

    })
);

    console.log("Token:", localStorage.getItem("token"));
    console.log("User:", localStorage.getItem("user"));
    
navigate("/");

} catch (error) {
console.log(error);
alert("Login Failed");
}
};

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
background: "var(--bg)",
transition: "0.3s",    }}
  >
    <div
      style={{
        width: "420px",
        padding: "35px",
        borderRadius: "18px",
        background: "var(--surface)",
color: "var(--text)",
border: "1px solid var(--border)",
boxShadow: "var(--shadow)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
color: "var(--text)",
          marginBottom: "30px",
        }}
      >
        Welcome Back 👋
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "18px",
            borderRadius: "10px",
border: "1px solid var(--border)",
background: "var(--surface)",
color: "var(--text)",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "10px",
border: "1px solid var(--border)",
background: "var(--surface)",
color: "var(--text)",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            textAlign: "right",
            marginBottom: "20px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              color: "#4CB1A1",
              fontWeight: "600",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "#4CB1A1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Login
        </button>

      </form>

      <p
  style={{
    textAlign: "center",
    marginTop: "25px",
    color: "var(--text)",
  }}
>
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#4CB1A1",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </p>

    </div>
  </div>
);
}

export default Login;