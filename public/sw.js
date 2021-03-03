const appname = "mld-time-logger";
const assets = ["/", "/index.html", "/build/bundle.css", "/build/bundle.js"];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(appname).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
