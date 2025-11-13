import React from "react";

function Menu({ onChangeMode }) {
  return (
    <div className="page-container">
      <img src="/logo.png" className="watermark" alt="watermark" />

      <h2>Choose an Option</h2>

      <button className="menu-btn" onClick={() => onChangeMode("study")}>
        📘 Study Mode
      </button>

      <button className="menu-btn" onClick={() => onChangeMode("exam")}>
        📝 Exam Mode (50 Questions)
      </button>

      <button className="menu-btn" onClick={() => onChangeMode("review")}>
        🔎 Review Mode
      </button>

      <button className="menu-btn" onClick={() => onChangeMode("officialExam")}>
        🎯 Official Exam (100 Questions)
      </button>
    </div>
  );
}

export default Menu;
