import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

const navigate = useNavigate();
const [formData, setFormData] = useState({
name: "",
email:  "",
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
"/auth/register",
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

navigate("/");
}
catch (error) {
console.log(error);
alert("Registration Failed");
}
};

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#FAFBFF",
    }}
  >
    <div
      style={{
        width: "420px",
        background: "white",
        padding: "35px",
        borderRadius: "18px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1E3A8A",
          marginBottom: "30px",
        }}
      >
        Create Account
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "18px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

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
            border: "1px solid #ccc",
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
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

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
          Register
        </button>

      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#4CB1A1",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
} 

export default Register;


