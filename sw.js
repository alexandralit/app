self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1.4').then((cache) => cache.addAll([
      '/apps/',
      '/apps/index.html',
      '/apps/index.js',
      '/apps/style.css',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
