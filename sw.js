// PWA Service Worker – TIME (network-first when online so updates show after one refresh)
const CACHE_NAME = 'time-v11';
const urlsToCache = [
  'index.html',
  'medicina-herbal.html',
  'tiempo-sagrado.html',
  'servicios.html',
  'sobre-mi.html',
  'blog.html',
  'contacto.html',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'images/logo-plant.png',
  'images/sacred-time-bg.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache.map(function (u) {
          return new Request(u, { cache: 'reload' });
        })).catch(function () {});
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  var url = event.request.url;
  var isHtml = event.request.mode === 'navigate';
  var isCssOrJs = /\.(css|js)(\?|$)/.test(url);
  var isImage = /\.(png|svg|jpg|jpeg|webp|ico|gif)(\?|$)/.test(url);
  var isManifest = /manifest\.json(\?|$)/.test(url);

  if (!isHtml && !isCssOrJs && !isImage && !isManifest) {
    return;
  }

  if (isCssOrJs || isHtml || isImage || isManifest) {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then(function (response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function () {
          return caches.match(event.request);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});
