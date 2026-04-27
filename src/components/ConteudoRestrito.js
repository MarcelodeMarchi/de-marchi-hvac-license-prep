import React, { useState } from "react";
import StudyMode from "./StudyMode";
import ExamMode from "./ExamMode";
import ReviewMode from "./ReviewMode";
import OfficialExam from "./OfficialExam";

import { businessFinanceQuestions } from "../data/questionsBusinessFinance";
import { hvacClassABQuestions } from "../data/questionsHVACClassAB";

import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function ConteudoRestrito({ onLogout }) {
  const [modo, setModo] = useState("menu");
  const [track, setTrack] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const selectedQuestions =
    track === "business" ? businessFinanceQuestions : hvacClassABQuestions;

  if (!track) {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        <h2>Choose a Track</h2>

        <button className="menu-btn" onClick={() => setTrack("business")}>
          Business & Finance ({businessFinanceQuestions.length})
        </button>

        <button className="menu-btn" onClick={() => setTrack("hvac")}>
          HVAC Class A & B ({hvacClassABQuestions.length})
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

  if (modo === "menu") {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        {/* ✅ CONTADOR FINAL */}
        <h2>
          Choose an Option
          <br />
          <span style={{ fontSize: "0.8em", opacity: 0.8 }}>
            Total Questions: {selectedQuestions.length}
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
          onClick={() => {
            setTrack(null);
            setModo("menu");
          }}
          style={{ marginTop: "20px" }}
        >
          Change Track
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

  const handleChangeTrack = () => {
    setTrack(null);
    setModo("menu");
  };

  if (modo === "study")
    return (
      <StudyMode
        onChangeMode={setModo}
        onChangeTrack={handleChangeTrack}
        questions={selectedQuestions}
      />
    );
  if (modo === "exam")
    return (
      <ExamMode
        onChangeMode={setModo}
        onChangeTrack={handleChangeTrack}
        questions={selectedQuestions}
      />
    );
  if (modo === "review")
    return (
      <ReviewMode
        onChangeMode={setModo}
        onChangeTrack={handleChangeTrack}
        questions={selectedQuestions}
      />
    );
  if (modo === "officialExam")
    return (
      <OfficialExam
        onChangeMode={setModo}
        onChangeTrack={handleChangeTrack}
        questions={selectedQuestions}
      />
    );

  return null;
}

export default ConteudoRestrito;
