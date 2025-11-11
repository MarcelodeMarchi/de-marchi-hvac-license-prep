import React, { useState } from "react";
import Menu from "./components/Menu";
import StudyMode from "./components/StudyMode";
import ExamMode from "./components/ExamMode";
import ReviewMode from "./components/ReviewMode";

export default function App() {
  const [mode, setMode] = useState("menu");

  const handleModeChange = (newMode) => setMode(newMode);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="logo.png" alt="De Marchi HVAC Logo" className="logo" />
        <h1>De Marchi HVAC – License Prep</h1>
      </header>

      <main>
        {mode === "menu" && <Menu onChangeMode={handleModeChange} />}
        {mode === "study" && <StudyMode onBack={() => setMode("menu")} />}
        {mode === "exam" && <ExamMode onBack={() => setMode("menu")} />}
        {mode === "review" && <ReviewMode onBack={() => setMode("menu")} />}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} De Marchi HVAC. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
