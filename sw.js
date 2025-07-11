
const CACHE_NAME = 'pwa-install-demo-v4';
const urlsToCache = [
  '/',
  'index.html',
  'app.html',
  'platforms.html',
  'search.html',
  'page2.html',
  'app.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'access-control.js',
  'styles.css'
];

// Install service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Enhanced fetch handler with access control awareness
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    // Check if it's a bot request (simple check in service worker)
    const userAgent = event.request.headers.get('user-agent') || '';
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|google-ads|adsbot/i.test(userAgent);
    
    // For bots, serve the actual requested page
    if (isBot) {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
      return;
    }
    
    // For PWA users (standalone mode), serve the requested page
    // Note: We can't detect standalone mode in service worker, so we rely on client-side logic
    
    // For regular browser navigation, let the client-side access control handle it
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
    return;
  }
  
  // For all other requests (assets, API calls, etc.), use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request);
      })
  );
});

// Update the service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
