import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";

export default function ExamMode({ onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const [examQuestions, setExamQuestions] = useState([]);

  useEffect(() => {
    // Embaralha e seleciona 50 perguntas aleatórias
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled.slice(0, 50));
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected) {
      const newAnswers = [...answers, { q: examQuestions[current], selected }];
      setAnswers(newAnswers);

      if (selected === examQuestions[current].answer) {
        setScore(score + 1);
      }

      setSelected(null);
      if (current + 1 < examQuestions.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    } else {
      alert("Selecione uma alternativa antes de continuar!");
    }
  };

  if (showResult) {
    const percentage = ((score / examQuestions.length) * 100).toFixed(1);
    const passed = percentage >= 70;

    return (
      <div>
        <h2>🧾 Exam Results</h2>
        <p>You answered {score} out of {examQuestions.length} correctly.</p>
        <h3>
          Final Score: {percentage}% –{" "}
          {passed ? "✅ Approved!" : "⚠️ Failed, try again."}
        </h3>

        <div style={{ marginTop: "20px" }}>
          <button onClick={onBack}>🏠 Return to Menu</button>
        </div>
      </div>
    );
  }

  if (examQuestions.length === 0) return <p>Loading exam...</p>;

  const question = examQuestions[current];

  return (
    <div>
      <h2>🧾 Exam Mode</h2>
      <p>
        <b>{current + 1}.</b> {question.question_en}
      </p>
      <p><i>{question.question_pt}</i></p>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {question.options.map((opt, i) => (
          <li key={i}>
            <button
              onClick={() => handleSelect(opt)}
              style={{
                backgroundColor: selected === opt ? "#004AAD" : "#FF6B00",
                color: "white",
                width: "80%",
                margin: "5px auto",
                display: "block",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleNext}>
          {current + 1 === examQuestions.length ? "Finish Exam" : "Next ➡️"}
        </button>
      </div>
    </div>
  );
}
