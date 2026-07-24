import { useState } from "react";
import {Link,  useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";
import "../styles/common.css";

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
<div className="auth-page">
<div className="auth-card">
<h1 className="auth-title">
        Welcome Back 👋
      </h1>

<form className="auth-form" onSubmit={handleSubmit}>
<input
  className="auth-input"
  type="email"
            name="email"
          placeholder="Email"
          onChange={handleChange}
        
        />

       <input
  className="auth-input"
  type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
         
        />

     <div
  style={{
    textAlign: "right",
    marginBottom: "20px",
  }}
>
<Link
  className="auth-link"
  to="/forgot-password"
>
            Forgot Password?
          </Link>
        </div>

<button
  className="auth-btn"
  type="submit"
>
          Login
        </button>

      </form>

<p className="auth-footer">
        Don't have an account?{" "}
<Link
  className="auth-link"
  to="/register"
>
          Register
        </Link>
      </p>

    </div>
  </div>
);
}

export default Login;