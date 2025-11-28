"use client";

import { useSyncExternalStore } from "react";

export function useIsStandalone() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(
        "(display-mode: standalone), (display-mode: window-controls-overlay)",
      );
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () =>
      window.matchMedia(
        "(display-mode: standalone), (display-mode: window-controls-overlay)",
      ).matches,
    () => false,
  );
}
