"use client";

import { useEffect, useState } from "react";

export function useIsStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia(
        "(display-mode: standalone), (display-mode: window-controls-overlay)",
      );
      setIsStandalone(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
        setIsStandalone(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  return isStandalone;
}
