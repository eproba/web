import { defaultCache } from "@serwist/next/worker";
import {
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  PrecacheEntry,
  Serwist,
  SerwistGlobalConfig,
} from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /\/auth\/.*/,
      handler: new NetworkOnly({
        networkTimeoutSeconds: 10,
      }),
    },
    {
      matcher: /\/worksheets\/?(?:manage|archive|templates)?\/?$/,
      handler: new NetworkFirst({
        cacheName: "worksheets",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
        ],
      }),
    },
    ...defaultCache,
  ],
  disableDevLogs: true,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

const urlsToCache = ["/", "/offline", "/about", "/regulations/male"] as const;

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        return serwist.handleRequest({
          request: new Request(entry),
          event,
        });
      }),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    const url = new URL(event.request.url);
    if (url.pathname === "/auth/callback" || url.pathname === "/") {
      // Reload cached pages on login or / (logout)
      Promise.all(
        urlsToCache.map((entry) => {
          return serwist.handleRequest({
            request: new Request(entry),
            event,
          });
        }),
      );
    }
  }
});

serwist.addEventListeners();
