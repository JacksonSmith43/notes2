const version = "v1.0.0-beta.2";

const files = [
    "notes2/",
    "notes2/index.js",
    "notes2/assets/favicon/favicon.ico",
    "notes2/assets/favicon/favicon-16x16.png",
    "notes2/assets/favicon/favicon-32x32.png",
    "notes2/assets/favicon/apple-touch-icon.png",
    "notes2/assets/favicon/safari-pinned-tab.svg",
    "notes2/assets/favicon/manifest.json",
    "notes2/assets/favicon/android-chrome-192x192.png",
    "notes2/assets/favicon/android-chrome-512x512.png",
    "notes2/assets/favicon/browserconfig.xml",
    "notes2/assets/favicon/mstile-70x70.png",
    "notes2/assets/favicon/mstile-144x144.png",
    "notes2/assets/favicon/mstile-150x150.png",
    "notes2/assets/favicon/mstile-310x150.png",
    "notes2/assets/favicon/mstile-310x310.png",
];


self.addEventListener("install", (event) => { // At first time use of Service Worker, it will be installed.
    event.waitUntil(
        caches.open(version).then((cache) => {
            console.log("Cache" + version + "created.");
            return cache.addAll(files); // If in "files" HTML, CSS, JS or Pictures files are angegeben, they can then be stored there and be used offline (cache).
        })
    );
});

self.addEventListener("fetch", (event) => { // fetch will be executed, when Service Worker receives a networkrequest dor a resource.
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request); // If it is not in the cache.
        })
    );
});

self.addEventListener("active", (event) => {
    const keep = [version];
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (keep.indexOf(key) === -1) { // Checks if current key is not in keep. If not, then this cache is not supposed to be kept.
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});



self.addEventListener("message", (event) => {
    if (event.data.action === "skipWaiting") {
        self.skipWaiting();
    }
});