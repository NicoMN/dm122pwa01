self.addEventListener('install', (event) => {
console.log('[Service worker] Installing service worker...', event);
self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[Service worker] Activating service worker...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('[Service worker] Fetch event: ' + event.request.url);        
});