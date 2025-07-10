"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClockIcon, RefreshCwIcon, WifiIcon, WifiOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OfflineStatusProps {
  className?: string;
}

export function OfflineStatus({ className }: OfflineStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [isFromCache, setIsFromCache] = useState(false);
  const [showCacheWarning, setShowCacheWarning] = useState(true);

  useEffect(() => {
    // Check if page was loaded from cache
    const checkCacheStatus = () => {
      if (typeof window !== "undefined") {
        // Check if the page was served from cache by looking at performance navigation timing
        const navigation = performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          // If transferSize is 0 or very small, it's likely from cache
          const fromCache =
            navigation.transferSize === 0 || navigation.transferSize < 300;
          setIsFromCache(fromCache);
        }
      }
    };

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Initial checks
    updateOnlineStatus();
    checkCacheStatus();

    // Listen for online/offline events
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismissCache = () => {
    setShowCacheWarning(false);
  };

  // Don't show anything if online and not from cache
  if (isOnline && !isFromCache) {
    return null;
  }

  // Don't show cache warning if dismissed
  if (isFromCache && isOnline && !showCacheWarning) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 pointer-events-none backdrop-blur-sm",
        !isOnline &&
          "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!isOnline ? (
              <WifiOffIcon className="size-4 text-red-600 dark:text-red-400" />
            ) : isFromCache ? (
              <ClockIcon className="size-4 text-yellow-600 dark:text-yellow-400" />
            ) : (
              <WifiIcon className="size-4 text-green-600 dark:text-green-400" />
            )}

            <span className="text-sm font-medium">
              {" "}
              {!isOnline ? (
                <span className="text-red-700 dark:text-red-300">
                  Jesteś offline. Dane mogą być nieaktualne.
                </span>
              ) : isFromCache ? (
                <span className="text-yellow-700 dark:text-yellow-300">
                  Dane mogą być nieaktualne.
                </span>
              ) : null}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isOnline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="h-8 px-3 text-xs"
              >
                <RefreshCwIcon className="w-3 h-3 mr-1" />
                Odśwież
              </Button>
            )}

            {isFromCache && isOnline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismissCache}
                className="h-8 px-3 text-xs"
              >
                ×
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
