// ═══════════════════════════════════════════════════════════════
// Service Worker – ELAMAR PWA
// يعمل في الخلفية ويتحكم في:
//   1. التخزين المؤقت (Cache) للعمل بدون إنترنت
//   2. تحديث التطبيق تلقائياً
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = 'elamar-v1.0';

// الملفات التي تُخزَّن مؤقتاً للعمل بدون إنترنت
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
];

// ── تثبيت Service Worker ─────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()) // تفعيل فوري
  );
});

// ── تفعيل وتنظيف الكاش القديم ────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // التحكم في كل التبويبات
  );
});

// ── اعتراض الطلبات ───────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Firebase + Google APIs: شبكة أولاً (بيانات حية)
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('google.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // ملفات التطبيق: كاش أولاً + تحديث في الخلفية
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      
      return cached || fetchPromise;
    })
  );
});

// ── رسائل من التطبيق ─────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
