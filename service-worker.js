const CACHE_NAME = 'media-wing-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/favicon.ico'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
            })
            .catch(error => {
                console.error('Caching failed: ', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(error => {
                console.error('Fetch failed; returning offline page instead.', error);
                return caches.match('/');
            })
    );
});
