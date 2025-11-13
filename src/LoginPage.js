import React, { useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch(() =>
      setError("Invalid email or password.")
    );
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError("Enter your email to reset password.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMsg("Password reset email sent!");
        setError("");
      })
      .catch(() => setError("Email not found."));
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <img src="/logo.png" className="welcome-logo" alt="logo" />

        <h1 className="welcome-title">License Prep</h1>

        {/* FORM */}
        <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "320px", margin: "0 auto" }}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="welcome-btn" type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p
          style={{
            marginTop: "15px",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: "500"
          }}
          onClick={handleForgotPassword}
        >
          Forgot password?
        </p>

        {/* Error / Success Messages */}
        {error && <p style={{ color: "#ffeb3b", marginTop: "10px" }}>{error}</p>}
        {resetMsg && <p style={{ color: "#00ff95", marginTop: "10px" }}>{resetMsg}</p>}

        <p style={{ marginTop: "40px", opacity: 0.6 }}>
          © 2025 License Prep – All rights reserved
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
