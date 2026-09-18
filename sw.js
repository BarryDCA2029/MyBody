const CACHE = "my-body-shell-v1.9.3";
const CORE = ["./", "./index.html?v=1.9.3", "./style.css?v=1.9.3", "./app.js?v=1.9.3", "./manifest.json?v=1.9.3", "./hero.jpg", "./body-start.png", "./body-now.png", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./favicon-32.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(()=>{})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request, {cache:"no-store"}).then(r => { const x=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,x)); return r; }).catch(() => caches.match(e.request).then(r=>r || caches.match("./index.html?v=1.9.3"))));
    return;
  }
  e.respondWith(fetch(e.request).then(r => { const x=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,x)); return r; }).catch(()=>caches.match(e.request)));
});
