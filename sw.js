// Service Worker: 常にネットワークから最新版を取得する
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  // HTMLファイルは常にネットワークから取得（キャッシュしない）
  if(e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request.url, {cache: 'no-store'}).catch(() => caches.match(e.request))
    );
    return;
  }
  // その他のリソースもキャッシュしない
  e.respondWith(fetch(e.request, {cache: 'no-store'}));
});
