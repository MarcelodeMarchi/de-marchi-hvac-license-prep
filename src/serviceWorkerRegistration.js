// serviceWorkerRegistration.js
// Registra o service worker para o modo offline

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/offline.js")
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration.scope);
        })
        .catch((error) => {
          console.error("Falha ao registrar o Service Worker:", error);
        });
    });
  }
}
