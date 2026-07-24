import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "../styles/auth.css";
import "../styles/common.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");

 const handleForgotPassword = async () => {
  console.log("Button clicked");

  try {
    console.log("Before API");

    const res = await API.post("/auth/forgot-password", {
      email,
    });

    console.log("After API");
    console.log(res.data);

    alert(res.data.message);
  } catch (error) {
    console.log("Catch Block");
    console.log(error);

    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
<div className="auth-page">
<div className="auth-card">
<h1 className="auth-title">
          Forgot Password
        </h1>

<input
  className="auth-input"
  type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
    
        />

<button
  className="auth-btn"
  onClick={handleForgotPassword}
>
          Send Reset Link
        </button>

<p className="auth-footer">
<Link
  className="auth-link"
  to="/login"
>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;