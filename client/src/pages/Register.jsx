import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import "../styles/common.css";

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
 <div className="auth-page">
<div className="auth-card">
<h1 className="auth-title">
        Create Account
      </h1>

<form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}

        />

        <input className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
         
        />

        <input className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        
        />

<button
  className="auth-btn"
  type="submit"
>Register</button>

      </form>
<p className="auth-footer">
        Already have an account?{" "}
<Link
  className="auth-link"
  to="/login"
>
          Login
        </Link>
      </p>

    </div>
  </div>
);
} 

export default Register;


