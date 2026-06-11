const CACHE_NAME = 'gantt-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // 全リクエストをネットワークから取得（キャッシュ一切使わない）
  e.respondWith(
    fetch(e.request, {cache: 'no-store'})
      .catch(() => new Response('offline', {status: 503}))
  );
});
