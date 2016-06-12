var dataCacheName = 'DhammaAudioData-v1';
var cacheName = 'DhammaAudioPWA-version-1-0';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Example from https://developers.google.com/ - commented out but left for reference until it can be replaced

// self.addEventListener('fetch', function(e) {
  // console.log('[ServiceWorker] Fetch', e.request.url);
  // var dataUrl = 'https://publicdata-weather.firebaseio.com/';
  // if (e.request.url.indexOf(dataUrl) === 0) {
    // e.respondWith(
      // fetch(e.request)
        // .then(function(response) {
          // return caches.open(dataCacheName).then(function(cache) {
            // cache.put(e.request.url, response.clone());
            // console.log('[ServiceWorker] Fetched&Cached Data');
            // return response;
          // });
        // })
    // );
  // } else {
    // e.respondWith(
      // caches.match(e.request).then(function(response) {
        // return response || fetch(e.request);
      // })
    // );
  // }
// });
