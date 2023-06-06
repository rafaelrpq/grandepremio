var DYNAMIC_CACHE = 'cache';
var urlsToCache = [
  './index.html',
  './index.css',
  './manifest.json',
  './index.js',
  './res/128.png',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open (DYNAMIC_CACHE)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener ('fetch', (event) => {
    event.respondWith((async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const response = await fetch(event.request);

      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      if (urlsToCache) {
        const responseToCache = response.clone();
        const cache = await caches.open(DYNAMIC_CACHE)
        await cache.put(event.request, response.clone());
      }

      return response;
    })());
})
