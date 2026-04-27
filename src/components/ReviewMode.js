import React, { useState, useEffect } from "react";
import { questions as allQuestions } from "../data/questionsData";
import {
  getNonRepeatingSelection,
  shuffleArray,
} from "../utils/questionPicker";
import { getReferenceInfo } from "../utils/questionReference";

function ReviewMode({ onChangeMode, onChangeTrack, questions }) {
  const questionsSource = questions || allQuestions;
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const picked = getNonRepeatingSelection(
      questionsSource,
      questionsSource.length
    ).map(
      (q) => ({
        ...q,
        options: shuffleArray(q.options),
      })
    );
    setShuffledQuestions(picked);
  }, [questionsSource]);

  if (shuffledQuestions.length === 0) return <p>Loading...</p>;

  const atual = shuffledQuestions[index];
  const referenceInfo = getReferenceInfo(atual);

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
      {referenceInfo.book && (
        <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "6px" }}>
          Livro: {referenceInfo.book}
        </p>
      )}
      {referenceInfo.chapter && (
        <p style={{ fontSize: "13px", opacity: 0.7, marginTop: "2px" }}>
          Capitulo: {referenceInfo.chapter}
          {referenceInfo.note ? " (aprox.)" : ""}
        </p>
      )}
      {referenceInfo.page && (
        <p style={{ fontSize: "13px", opacity: 0.7, marginTop: "2px" }}>
          Pagina: {referenceInfo.page}
          {referenceInfo.note ? " (aprox.)" : ""}
        </p>
      )}

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

      <button
        onClick={onChangeTrack}
        className="secondary-btn"
        style={{ marginTop: "10px" }}
      >
        Change Track
      </button>
    </div>
  );
}

export default ReviewMode;

