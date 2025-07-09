"use client";

import { useEffect, useState } from "react";
import {
  getExistingToken,
  onMessageListener,
  registerDevice,
  requestNotificationPermission,
} from "@/lib/firebase";
import { toast } from "react-toastify";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";

export function AutoNotificationSetup() {
  const [hasAttemptedSetup, setHasAttemptedSetup] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { apiClient, isApiReady } = useApi();

  // Track online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (isApiReady && !hasAttemptedSetup && isOnline) {
      const setupNotifications = async () => {
        try {
          if (!("Notification" in window) || !("serviceWorker" in navigator)) {
            console.log("Notifications not supported in this browser");
            return;
          }

          const permission = Notification.permission;

          if (permission === "granted") {
            const existingToken = await getExistingToken();
            if (existingToken) {
              const registered = await registerDevice(existingToken, apiClient);
              if (!registered && isOnline) {
                toast.warn(
                  ToastMsg({
                    data: {
                      title: "Nie udało się aktywować powiadomień",
                      description: "Odśwież stronę, aby spróbować ponownie.",
                    },
                  }),
                );
              }
            }
          } else if (permission === "default") {
            console.log(
              "Auto setup - Requesting notification permission for authenticated user",
            );
            const token = await requestNotificationPermission();
            if (token) {
              console.log("Auto setup - Got new FCM token:", token);

              const registered = await registerDevice(token, apiClient);
              if (!registered && isOnline) {
                toast.warn(
                  ToastMsg({
                    data: {
                      title: "Nie udało się aktywować powiadomień",
                      description: "Odśwież stronę, aby spróbować ponownie.",
                    },
                  }),
                );
              }
            }
          } else {
            console.log("Auto setup - Notification permission denied");
          }
        } catch (error) {
          console.error("Auto setup - Error setting up notifications:", error);
          // Only show error toast if we're online (network errors when offline are expected)
          if (isOnline) {
            toast.error(
              ToastMsg({
                data: {
                  title: "Błąd powiadomień",
                  description: "Wystąpił problem z konfiguracją powiadomień.",
                },
              }),
            );
          }
        }
      };

      setupNotifications();
      setHasAttemptedSetup(true);
    }
  }, [isApiReady, hasAttemptedSetup, apiClient, isOnline]);

  useEffect(() => {
    const setupMessageListener = async () => {
      try {
        const unsubscribe = await onMessageListener((payload) => {
          const notificationPayload = payload;
          console.log(
            "AutoNotificationSetup: Firebase onMessage received:",
            notificationPayload,
          );
          toast.info(
            ToastMsg({
              data: {
                title:
                  notificationPayload.notification?.title || "Nowa wiadomość",
                description:
                  notificationPayload.notification?.body ||
                  "Masz nową wiadomość",
                href: notificationPayload.fcmOptions?.link,
              },
            }),
          );
        });

        return unsubscribe;
      } catch (err: unknown) {
        console.error(
          "AutoNotificationSetup: Failed to setup Firebase onMessage listener:",
          err,
        );
        return () => {};
      }
    };

    let cleanup: (() => void) | undefined;

    setupMessageListener().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}

export default AutoNotificationSetup;
