import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { register } from "./serviceWorkerRegistration";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(document.getElementById("root"));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

register(); // Ativa o modo offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
