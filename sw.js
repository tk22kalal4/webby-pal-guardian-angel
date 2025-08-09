const CACHE_NAME = 'lastpulse-v3';
const urlsToCache = [
  './',
  './index.html',
  './app.html',
  './platforms.html',
  './search.html',
  './styles.css',
  './home.css',
  './splash.css',
  './script.js',
  './access-control.js',
  './pwa-handler.js',
  './app.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './platforms/marrow/marrow-subjects.html',
  './platforms/dams/dams-subjects.html',
  './platforms/prepladder/prepladder-subjects.html',
  './quiz/index.html',
  './quiz/app.html',
  './quiz/platforms.html',
  './quiz/bookmarks.html',
  './quiz/qbank-main.css'
];

// Bot user agents that should have full access
const botUserAgents = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'developers.google.com/+/web/snippet',
  'www.google.com/webmasters/tools/richsnippets',
  'slackbot',
  'vkShare',
  'W3C_Validator',
  'redditbot',
  'Applebot',
  'WhatsApp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'SkypeUriPreview',
  'nuzzel',
  'Discordbot',
  'Google Page Speed',
  'Qwantify',
  'pinterestbot',
  'Bitrix link preview',
  'XING-contenttabreceiver',
  'Chrome-Lighthouse',
  'TelegramBot',
  'Google-Ads-Overview',
  'Google-Adwords',
  'Google-Site-Verification'
];

// Check if request is from a bot
function isBot(userAgent) {
  if (!userAgent) return false;
  return botUserAgents.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const userAgent = event.request.headers.get('user-agent') || '';
  
  // Allow bots to access all content
  if (isBot(userAgent)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // For root requests, serve the app with splash screen
  if (event.request.mode === 'navigate' && 
      (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/app.html')) {
    event.respondWith(
      caches.match('./app.html')
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // For all other requests, serve from cache first
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
