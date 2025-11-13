import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

function ExamMode({ onChangeMode }) {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [reviewing, setReviewing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 2 hours

  useEffect(() => {
    const shuffled = shuffleArray(questions)
      .slice(0, 50)
      .map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));
    setSelectedQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  if (selectedQuestions.length === 0) return <p>Loading Exam...</p>;

  const atual = selectedQuestions[index];

  const handleAnswer = (option) => {
    if (option === atual.answer) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question_en: atual.question_en,
          question_pt: atual.question_pt,
          selected: option,
          correct: atual.answer,
        },
      ]);
    }

    if (index === selectedQuestions.length - 1) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ========= REVIEW SCREEN ========= */
  if (reviewing) {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        <h2>Incorrect Answers Review 🔎</h2>

        {wrongAnswers.length === 0 && (
          <p style={{ color: "green" }}>Perfect! No mistakes ✔</p>
        )}

        {wrongAnswers.map((w, i) => (
          <div key={i} className="wrong-box">
            <p><strong>{w.question_en}</strong></p>
            <p><em>{w.question_pt}</em></p>
            <p>Your answer: ❌ {w.selected}</p>
            <p>Correct answer: ✔ {w.correct}</p>
          </div>
        ))}

        <button className="primary-btn" onClick={() => onChangeMode("menu")}>
          Return to Menu
        </button>
      </div>
    );
  }

  /* ========= FINISHED SCREEN ========= */
  if (finished) {
    const percentage = (score / selectedQuestions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        <h2>Exam Finished 📝</h2>

        <h3>Your Score: {score} / {selectedQuestions.length}</h3>

        <h2 style={{ color: passed ? "green" : "red" }}>
          {passed ? "APPROVED ✔" : "FAILED ✘"}
        </h2>

        <h3>{percentage.toFixed(2)}%</h3>

        <button className="primary-btn" onClick={() => setReviewing(true)}>
          Review Incorrect Answers
        </button>

        <button className="secondary-btn" onClick={() => onChangeMode("menu")}>
          Return to Menu
        </button>
      </div>
    );
  }

  /* ========= EXAM SCREEN ========= */
  return (
    <div className="page-container">
      <img src="/logo.png" className="watermark" alt="watermark" />

      <h2>Exam Mode 📝</h2>

      <h3 className="timer">Time Left: {formatTime(timeLeft)}</h3>

      {/* 🔹 ADICIONADO: número da questão */}
      <h3 style={{ color: "#0052a2", marginBottom: "15px" }}>
        Question {index + 1} of 50
      </h3>

      <p className="question-en"><strong>{atual.question_en}</strong></p>
      <p className="question-pt"><em>{atual.question_pt}</em></p>

      <div className="options">
        {atual.options.map((op, i) => (
          <button
            key={i}
            className="option-btn"
            onClick={() => handleAnswer(op)}
          >
            {op}
          </button>
        ))}
      </div>

      <button className="secondary-btn" onClick={() => onChangeMode("menu")}>
        Cancel Exam
      </button>
    </div>
  );
}

export default ExamMode;
