import React, { useState } from "react";
import StudyMode from "./StudyMode";
import ExamMode from "./ExamMode";
import ReviewMode from "./ReviewMode";
import OfficialExam from "./OfficialExam";

// 🔴 IMPORT ABSOLUTO CORRETO (bate com seu path)
import { questions } from "../data/questionsData";

import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function ConteudoRestrito({ onLogout }) {
  const [modo, setModo] = useState("menu");

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  if (modo === "menu") {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        {/* ✅ CONTADOR FINAL */}
        <h2>
          Choose an Option
          <br />
          <span style={{ fontSize: "0.8em", opacity: 0.8 }}>
            Total Questions: {questions.length}
          </span>
        </h2>

        <button className="menu-btn" onClick={() => setModo("study")}>
          📘 Study Mode
        </button>

        <button className="menu-btn" onClick={() => setModo("exam")}>
          📝 Exam Mode
        </button>

        <button className="menu-btn" onClick={() => setModo("review")}>
          🔎 Review Mode
        </button>

        <button className="menu-btn" onClick={() => setModo("officialExam")}>
          🎯 Official Exam
        </button>

        <button
          className="secondary-btn"
          onClick={handleLogout}
          style={{ marginTop: "25px" }}
        >
          Exit
        </button>
      </div>
    );
  }

  if (modo === "study") return <StudyMode onChangeMode={setModo} />;
  if (modo === "exam") return <ExamMode onChangeMode={setModo} />;
  if (modo === "review") return <ReviewMode onChangeMode={setModo} />;
  if (modo === "officialExam") return <OfficialExam onChangeMode={setModo} />;

  return null;
}

export default ConteudoRestrito;
