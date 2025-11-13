import React from "react";
import "../styles.css";

function WelcomeScreen({ onEnter }) {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <img src="/logo.png" alt="Logo" className="welcome-logo" />

        <h1 className="welcome-title">De Marchi HVAC</h1>
        <h2 className="welcome-subtitle">License Exam Prep</h2>

        <button className="welcome-btn" onClick={onEnter}>
          ENTER
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
