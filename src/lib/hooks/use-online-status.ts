"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track online/offline status
 * Handles SSR properly by initializing as undefined and setting the actual status once mounted
 * @returns boolean - true if online, false if offline, true during SSR/initial load
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        setIsOnline(navigator.onLine);
      }
    };

    // Initial check
    updateOnlineStatus();

    // Listen for online/offline events
    if (typeof window !== "undefined") {
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      }
    };
  }, []);

  return isOnline;
}
