import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'styles'
  })
);

registerRoute(
  ({ request }) => request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'scripts'
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60
      })
    ]
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://cdnjs.cloudflare.com',
  new StaleWhileRevalidate({
    cacheName: 'cdn'
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('[SW] Activated and claiming clients');
    })
  );
});

// ===========================
// SERVICE WORKER DASHBOARD JS
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initClock();
  initCounters();
  registerSW();
  monitorConnection();
  setupPWAInstall();
});

// ===========================
// TOAST NOTIFICATIONS
// ===========================

function showToast(message, type = "info") {
  const toast = document.createElement("div");

  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===========================
// THEME TOGGLE
// ===========================

function initTheme() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

    showToast(
      `Theme switched to ${
        isLight ? "Light" : "Dark"
      } mode`
    );
  });
}

// ===========================
// LIVE CLOCK
// ===========================

function initClock() {
  const clock = document.getElementById("liveClock");

  if (!clock) return;

  const updateClock = () => {
    const now = new Date();

    clock.textContent =
      now.toLocaleDateString() +
      " • " +
      now.toLocaleTimeString();
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// ===========================
// ANIMATED COUNTERS
// ===========================

function animateCounter(element, target) {
  let current = 0;

  const increment = Math.ceil(target / 80);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent =
      current.toLocaleString();
  }, 20);
}

function initCounters() {
  document
    .querySelectorAll("[data-counter]")
    .forEach(el => {
      const target = parseInt(
        el.dataset.counter,
        10
      );

      animateCounter(el, target);
    });
}

// ===========================
// ONLINE / OFFLINE STATUS
// ===========================

function monitorConnection() {
  const status = document.getElementById(
    "connectionStatus"
  );

  const updateStatus = () => {
    const online = navigator.onLine;

    if (status) {
      status.textContent = online
        ? "Online"
        : "Offline";

      status.className = online
        ? "online"
        : "offline";
    }

    showToast(
      online
        ? "Internet connection restored"
        : "You are offline",
      online ? "success" : "warning"
    );
  };

  window.addEventListener(
    "online",
    updateStatus
  );

  window.addEventListener(
    "offline",
    updateStatus
  );

  updateStatus();
}

// ===========================
// SERVICE WORKER
// ===========================

async function registerSW() {
  const swStatus =
    document.getElementById("swStatus");

  if (!("serviceWorker" in navigator)) {
    if (swStatus)
      swStatus.textContent =
        "Not Supported";

    showToast(
      "Service Worker not supported",
      "error"
    );
    return;
  }

  try {
    const registration =
      await navigator.serviceWorker.register(
        "./sw.js"
      );

    if (swStatus)
      swStatus.textContent = "Active";

    showToast(
      "Service Worker Registered",
      "success"
    );

    console.log(
      "SW Registered:",
      registration
    );

    checkForUpdates(registration);
    getCacheStats();

  } catch (error) {
    console.error(error);

    if (swStatus)
      swStatus.textContent = "Failed";

    showToast(
      "SW Registration Failed",
      "error"
    );
  }
}

// ===========================
// CHECK FOR SW UPDATE
// ===========================

function checkForUpdates(registration) {
  setInterval(() => {
    registration.update();
  }, 60000);

  registration.addEventListener(
    "updatefound",
    () => {
      showToast(
        "New update available",
        "info"
      );
    }
  );
}

// ===========================
// CACHE STORAGE INFO
// ===========================

async function getCacheStats() {
  if (!("caches" in window)) return;

  try {
    const cacheNames =
      await caches.keys();

    const cacheCount =
      document.getElementById(
        "cacheCount"
      );

    if (cacheCount) {
      cacheCount.textContent =
        cacheNames.length;
    }

    let totalRequests = 0;

    for (const name of cacheNames) {
      const cache =
        await caches.open(name);

      const keys =
        await cache.keys();

      totalRequests += keys.length;
    }

    const assets =
      document.getElementById(
        "cachedAssets"
      );

    if (assets) {
      assets.textContent =
        totalRequests.toLocaleString();
    }

  } catch (err) {
    console.error(err);
  }
}

// ===========================
// PWA INSTALL PROMPT
// ===========================

let deferredPrompt = null;

function setupPWAInstall() {
  const installBtn =
    document.getElementById(
      "installBtn"
    );

  window.addEventListener(
    "beforeinstallprompt",
    e => {
      e.preventDefault();

      deferredPrompt = e;

      if (installBtn) {
        installBtn.style.display =
          "inline-flex";
      }
    }
  );

  installBtn?.addEventListener(
    "click",
    async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      const result =
        await deferredPrompt.userChoice;

      if (
        result.outcome === "accepted"
      ) {
        showToast(
          "PWA Installed",
          "success"
        );
      }

      deferredPrompt = null;
    }
  );
}

// ===========================
// DEMO LOG GENERATOR
// ===========================

function addLog(message) {
  const logContainer =
    document.getElementById("logs");

  if (!logContainer) return;

  const item =
    document.createElement("div");

  item.className = "log-item";

  item.innerHTML = `
    <span>${new Date().toLocaleTimeString()}</span>
    <span>${message}</span>
  `;

  logContainer.prepend(item);
}

setInterval(() => {
  const logs = [
    "Cache updated",
    "Background sync completed",
    "Network request intercepted",
    "Offline page served",
    "Push notification received"
  ];

  addLog(
    logs[
      Math.floor(
        Math.random() * logs.length
      )
    ]
  );
}, 5000);