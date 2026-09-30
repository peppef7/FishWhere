// Service worker: l'app si apre anche senza rete e mostra le ultime previsioni scaricate per ogni spot.
const VERSION = 'dp-1.0.1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
const TILES = 'dp-tiles', MAX_TILES = 600;
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function trim() { const c = await caches.open(TILES); const ks = await c.keys(); for (let i = 0; i < ks.length - MAX_TILES; i++) await c.delete(ks[i]); }
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Tile satellitari: prima la cache (non cambiano), poi la rete
  if (url.hostname === 'server.arcgisonline.com') {
    e.respondWith(caches.open(TILES).then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { c.put(e.request, r.clone()); trim(); return r; }))));
    return;
  }
  // Tutto il resto (app, previsioni Open-Meteo, font): prima la rete, la cache se offline
  e.respondWith(fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: url.origin === location.origin }).then(r => r || (e.request.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
