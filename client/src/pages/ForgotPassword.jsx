import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

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
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleForgotPassword}
          style={{
            width: "100%",
            padding: "14px",
            background: "#4CB1A1",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Send Reset Link
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "#4CB1A1",
              textDecoration: "none",
            }}
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;