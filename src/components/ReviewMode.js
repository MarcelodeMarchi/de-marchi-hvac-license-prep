import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";

// Função única de embaralhamento
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function ReviewMode({ onChangeMode }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mixed = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(mixed);
  }, []);

  if (shuffledQuestions.length === 0) return <p>Loading...</p>;

  const atual = shuffledQuestions[index];

  return (
    <div className="page-container">
      {/* Marca d’água */}
      <img src="/logo.png" className="watermark" alt="watermark" />

      <h2>Review Mode 🔍</h2>

      <p style={{ fontSize: "20px" }}>
        <strong>{atual.question_en}</strong>
      </p>

      <p style={{ fontSize: "16px", opacity: 0.7 }}>
        <em>{atual.question_pt}</em>
      </p>

      {/* Alternativas (todas exibidas) */}
      <div className="options">
        {atual.options.map((op, i) => (
          <button
            key={i}
            className={`option-btn ${
              op === atual.answer ? "correct-btn" : "wrong-btn"
            }`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Botão Next */}
      <button
        onClick={() => setIndex((old) => (old + 1) % shuffledQuestions.length)}
        className="primary-btn"
        style={{ marginTop: "20px" }}
      >
        Next →
      </button>

      {/* Menu */}
      <button
        onClick={() => onChangeMode("menu")}
        className="secondary-btn"
        style={{ marginTop: "15px" }}
      >
        Return to Menu
      </button>
    </div>
  );
}

export default ReviewMode;

