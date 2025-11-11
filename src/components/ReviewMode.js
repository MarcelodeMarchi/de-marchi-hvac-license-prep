import React, { useState } from "react";
import { questions } from "../data/questionsData";

export default function ReviewMode({ onBack }) {
  const [index, setIndex] = useState(0);
  const question = questions[index];

  const nextQuestion = () => {
    if (index < questions.length - 1) setIndex(index + 1);
  };

  const prevQuestion = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div>
      <h2>🔁 Review Mode</h2>
      <p>
        <b>{index + 1}.</b> {question.question_en}
      </p>
      <p><i>{question.question_pt}</i></p>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {question.options.map((opt, i) => (
          <li
            key={i}
            style={{
              color: opt === question.answer ? "#004AAD" : "#1A1A1A",
              fontWeight: opt === question.answer ? "bold" : "normal",
            }}
          >
            {opt}
          </li>
        ))}
      </ul>

      <p><b>Correct Answer:</b> {question.answer}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion}>⬅️ Previous</button>
        <button onClick={nextQuestion}>Next ➡️</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>🏠 Return to Menu</button>
      </div>
    </div>
  );
}
