const cacheName ='app-shell-v3';
const assetsToCache = [
    'offline.html'
];

function removeOldCache(key) {
    if(key != cacheName) {
        console.log(`[Service Worker] Removing old cache: ${key}`);
        return caches.delete(key);
    }
}

async function cacheCleanUp() {
    const keyList = await caches.keys();
    return Promise.all(keyList.map(removeOldCache));
}

async function cacheStaticAssets () {
    const cache = await caches.open(cacheName);   
    return cache.addAll(assetsToCache);
}

self.addEventListener('install', (event) => {
console.log('[Service worker] Installing service worker...', event);

event.waitUntil(cacheStaticAssets());
self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[Service worker] Activating service worker...', event);
    event.waitUntil(cacheCleanUp());
    return self.clients.claim();
});

async function networkFirst(request) {
    try {
        return await fetch(request);
    } catch(error) {
        const cache = await caches.open(cacheName);
        return cache.match('offline.html');
    }
}

self.addEventListener('fetch', event => {
    console.log('[Service worker] Fetch event: ' + event.request.url);        
    event.respondWith(networkFirst(event.request));
});