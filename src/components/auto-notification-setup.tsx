"use client";

import { useApi } from "@/lib/api-client";
import {
  getExistingToken,
  onMessageListener,
  registerDevice,
  requestNotificationPermission,
} from "@/lib/firebase";
import { ToastMsg } from "@/lib/toast-msg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function AutoNotificationSetup() {
  const [hasAttemptedSetup, setHasAttemptedSetup] = useState(false);
  const { apiClient, isApiReady } = useApi();

  useEffect(() => {
    if (isApiReady && !hasAttemptedSetup) {
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
              if (!registered) {
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
              if (!registered) {
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
        }
      };

      setupNotifications();
      setHasAttemptedSetup(true);
    }
  }, [isApiReady, hasAttemptedSetup, apiClient]);

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
