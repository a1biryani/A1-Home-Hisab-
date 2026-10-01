const CACHE_NAME = "a1-home-hisab-v1";

const FILES_TO_CACHE = [
  "/A1-Home-Hisab/",
  "/A1-Home-Hisab/index.html",
  "/A1-Home-Hisab/manifest.json",
  "/A1-Home-Hisab/icon-192.png",
  "/A1-Home-Hisab/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
