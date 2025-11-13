import React, { useState } from "react";
import StudyMode from "./StudyMode";
import ExamMode from "./ExamMode";
import ReviewMode from "./ReviewMode";
import OfficialExam from "./OfficialExam";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function ConteudoRestrito({ onLogout }) {
  const [modo, setModo] = useState("menu");

  const handleLogout = async () => {
    await signOut(auth);
    onLogout(); // volta para o LoginPage
  };

  if (modo === "menu") {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        <h2>Choose an Option</h2>

        <button className="menu-btn" onClick={() => setModo("study")}>📘 Study Mode</button>
        <button className="menu-btn" onClick={() => setModo("exam")}>📝 Exam Mode</button>
        <button className="menu-btn" onClick={() => setModo("review")}>🔎 Review Mode</button>
        <button className="menu-btn" onClick={() => setModo("officialExam")}>🎯 Official Exam</button>

        <button className="secondary-btn" onClick={handleLogout} style={{ marginTop: "25px" }}>
          Exit
        </button>
      </div>
    );
  }

  switch (modo) {
    case "study":
      return <StudyMode onChangeMode={setModo} />;
    case "exam":
      return <ExamMode onChangeMode={setModo} />;
    case "review":
      return <ReviewMode onChangeMode={setModo} />;
    case "officialExam":
      return <OfficialExam onChangeMode={setModo} />;
    default:
      return null;
  }
}

export default ConteudoRestrito;
