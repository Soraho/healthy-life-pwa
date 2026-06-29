const CACHE_NAME = "healthy-life-pwa-v18";
const PUSH_CONFIG_CACHE = "healthy-life-push-config";
const PUSH_CONFIG_FILE = "./push-config.json";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./firebase-config.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        for (const client of clients) {
          client.postMessage({ type: "APP_UPDATED", cacheName: CACHE_NAME });
        }
      })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isAppFile = url.origin === self.location.origin;
  const request = isAppFile ? new Request(event.request, { cache: "reload" }) : event.request;
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

async function readPushConfig() {
  const configUrl = new URL(PUSH_CONFIG_FILE, self.registration.scope).href;
  const response = await caches.match(configUrl);
  if (!response) return null;
  return response.json();
}

async function showLatestPushNotification() {
  const config = await readPushConfig();
  if (!config?.workerUrl || !config?.room) {
    await self.registration.showNotification("健康生活新紀錄", {
      body: "有人新增紀錄了，打開看看戰況。",
      icon: "./assets/icon.svg",
      badge: "./assets/icon.svg",
    });
    return;
  }

  let payload = null;
  try {
    const url = new URL("/latest", config.workerUrl);
    url.searchParams.set("room", config.room);
    url.searchParams.set("clientId", config.clientId || "");
    const response = await fetch(url.toString(), { cache: "no-store" });
    if (response.ok) payload = await response.json();
  } catch {}

  await self.registration.showNotification(payload?.title || "健康生活新紀錄", {
    body: payload?.body || "有人新增紀錄了，打開看看戰況。",
    icon: "./assets/icon.svg",
    badge: "./assets/icon.svg",
    data: { url: self.registration.scope },
  });
}

self.addEventListener("push", (event) => {
  event.waitUntil(showLatestPushNotification());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(event.notification.data?.url || "./");
      return undefined;
    })
  );
});
