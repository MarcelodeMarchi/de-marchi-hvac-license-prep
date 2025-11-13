import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";

// 🔹 Função para embaralhar arrays (AGORA DEFINIDA CORRETAMENTE)
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function StudyMode({ onChangeMode }) {
  const [questionList, setQuestionList] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Carrega perguntas e respostas embaralhadas somente uma vez
  useEffect(() => {
    const shuffledQuestions = shuffleArray(questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestionList(shuffledQuestions);
  }, []);

  if (questionList.length === 0) return <p>Loading...</p>;

  const atual = questionList[index];

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
        <button
          onClick={nextQuestion}
          className="primary-btn"
          style={{ marginTop: "20px" }}
        >
          Next →
        </button>
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
