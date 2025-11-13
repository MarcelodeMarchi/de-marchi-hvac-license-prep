// offline.js — Service Worker for De Marchi HVAC License Prep PWA

const CACHE_NAME = "demarchi-hvac-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo.png"
];

// Instala o service worker e armazena os arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker e remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Intercepta as requisições e serve do cache quando offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
