import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// REMOVE service worker — usar apenas como app normal
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Garante que nenhum service worker antigo permaneça ativo
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
  });
}
