import React, { useState, useEffect } from "react";
import { questions } from "../data/questionsData";

// Função global única de embaralhar
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

function OfficialExam({ onChangeMode }) {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Carrega 100 questões embaralhadas + respostas embaralhadas
  useEffect(() => {
    const shuffled = shuffleArray(questions)
      .slice(0, 100)
      .map((q) => ({ ...q, options: shuffleArray(q.options) }));

    setSelectedQuestions(shuffled);
  }, []);

  if (selectedQuestions.length === 0) return <p>Loading...</p>;

  const atual = selectedQuestions[index];

  const handleAnswer = (op) => {
    if (op === atual.answer) setScore((s) => s + 1);

    if (index === selectedQuestions.length - 1) {
      setFinished(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  /* ==========================
       TELA FINAL DO EXAME
     ========================== */
  if (finished) {
    return (
      <div className="page-container">
        <img src="/logo.png" className="watermark" alt="watermark" />

        <h2>Official Exam 🎯</h2>

        <h3>Your Score: {score} / 100</h3>

        <button className="primary-btn" onClick={() => onChangeMode("menu")}>
          Return to Menu
        </button>
      </div>
    );
  }

  /* ==========================
          TELA DO EXAME
     ========================== */
  return (
    <div className="page-container">
      <img src="/logo.png" className="watermark" alt="watermark" />

      <h2>Official Exam (100 Questions) 🎯</h2>

      {/* Número da Questão */}
      <h3>
        Question {index + 1} / {selectedQuestions.length}
      </h3>

      <p className="question-en">{atual.question_en}</p>
      <p className="question-pt">{atual.question_pt}</p>

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

export default OfficialExam;
