import React, { useState, useEffect } from "react";
import { questions as allQuestions } from "../data/questionsData";
import {
  getNonRepeatingSelection,
  shuffleArray,
} from "../utils/questionPicker";

function OfficialExam({ onChangeMode, onChangeTrack, questions }) {
  const questionsSource = questions || allQuestions;
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Carrega 100 questões embaralhadas + respostas embaralhadas
  useEffect(() => {
    const count = Math.min(100, questionsSource.length);
    const picked = getNonRepeatingSelection(questionsSource, count).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setSelectedQuestions(picked);
  }, [questionsSource]);

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

        <h3>Your Score: {score} / {selectedQuestions.length}</h3>

        <button className="primary-btn" onClick={() => onChangeMode("menu")}>
          Return to Menu
        </button>

        <button className="secondary-btn" onClick={onChangeTrack}>
          Change Track
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

      <h2>Official Exam ({selectedQuestions.length} Questions) 🎯</h2>

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

      <button className="secondary-btn" onClick={onChangeTrack}>
        Change Track
      </button>
    </div>
  );
}

export default OfficialExam;
