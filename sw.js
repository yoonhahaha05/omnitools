// OmniTools Service Worker - Offline Shell Caching
const CACHE_NAME = 'omnitools-cache-v3';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/css/styles.css',
  '/assets/favicon.svg',
  '/assets/favicon.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/og-image.png',
  '/js/utils.js',
  '/js/registry.js',
  '/js/app.js',
  '/js/tools/text.js',
  '/js/tools/dev.js',
  '/js/tools/math.js',
  '/js/tools/media.js',
  '/js/tools/quick.js',
  '/pages/about',
  '/pages/privacy'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Some static assets failed to cache during SW install:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-first falling back to cache strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip chrome-extension / non-http
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  // Skip AdSense and third-party trackers from SW cache
  if (
    event.request.url.includes('googlesyndication.com') ||
    event.request.url.includes('google-analytics.com') ||
    event.request.url.includes('buymeacoffee.com')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful local responses
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to index.html for navigation if available
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline: Resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
