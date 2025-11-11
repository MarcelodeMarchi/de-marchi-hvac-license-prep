import React from "react";

export default function Menu({ onChangeMode }) {
  return (
    <div>
      <h2>Selecione o modo de estudo</h2>
      <button onClick={() => onChangeMode("study")}>📘 Study Mode</button>
      <button onClick={() => onChangeMode("exam")}>🧾 Exam Mode</button>
      <button onClick={() => onChangeMode("review")}>🔁 Review Mode</button>
    </div>
  );
}
