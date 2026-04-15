import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";
import {
  getNonRepeatingSelection,
  shuffleArray,
} from "../utils/questionPicker";
import { getReferenceBook } from "../utils/questionReference";

function StudyMode({ onChangeMode }) {
  const [questionList, setQuestionList] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Carrega perguntas e respostas embaralhadas somente uma vez
  useEffect(() => {
    const picked = getNonRepeatingSelection(questions, questions.length).map(
      (q) => ({
        ...q,
        options: shuffleArray(q.options),
      })
    );
    setQuestionList(picked);
  }, []);

  if (questionList.length === 0) return <p>Loading...</p>;

  const atual = questionList[index];
  const referenceBook = getReferenceBook(atual);

  const handleOptionClick = (op) => {
    setSelectedOption(op);
  };

  const nextQuestion = () => {
    setIndex((i) => (i + 1) % questionList.length);
    setSelectedOption(null);
  };

  // Define as cores dos botões após clique
  const getButtonStyle = (op) => {
    if (!selectedOption) return "option-btn";

    if (op === atual.answer) return "option-btn correct-btn";

    if (op === selectedOption && op !== atual.answer)
      return "option-btn wrong-btn";

    return "option-btn";
  };

  return (
    <div className="page-container">
      {/* Marca d’água */}
      <img src="/logo.png" className="watermark" alt="watermark" />

      <h2>Study Mode 📘</h2>

      <p style={{ fontSize: "20px" }}>{atual.question_en}</p>
      <p style={{ fontSize: "16px", opacity: 0.7 }}>
        <em>{atual.question_pt}</em>
      </p>
      {referenceBook && (
        <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "6px" }}>
          Livro: {referenceBook}
        </p>
      )}

      <div className="options" style={{ marginTop: "20px" }}>
        {atual.options.map((op, i) => (
          <button
            key={i}
            className={getButtonStyle(op)}
            onClick={() => handleOptionClick(op)}
            disabled={selectedOption !== null}
          >
            {op}
          </button>
        ))}
      </div>

{selectedOption && (
  <>
    {/* ✅ Referência do livro */}
    <div style={{ marginTop: "20px", textAlign: "left" }}>
      <p style={{ fontWeight: "bold", color: "#2ecc71" }}>
        ✅ Correct Answer: {atual.answer}
      </p>

            {referenceBook && (
        <div style={{ marginTop: "10px", fontSize: "14px", opacity: 0.9 }}>
                <p><strong>📘 Source:</strong> {referenceBook}</p>

          {atual.reference_chapter && (
            <p>Chapter: {atual.reference_chapter}</p>
          )}

          {atual.reference_section && (
            <p>Section: {atual.reference_section}</p>
          )}

          {atual.reference_page && (
            <p>Page: {atual.reference_page}</p>
          )}

          {atual.reference_paragraph && (
            <p>Paragraph: {atual.reference_paragraph}</p>
          )}
        </div>
      )}
    </div>

    <button
      onClick={nextQuestion}
      className="primary-btn"
      style={{ marginTop: "20px" }}
    >
      Next →
    </button>
  </>
)}

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

export default StudyMode;
