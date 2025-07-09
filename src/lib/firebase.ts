import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  MessagePayload,
  onMessage,
} from "firebase/messaging";
import { UAParser } from "ua-parser-js";

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBKVP78_xDjRNNs9VBk2fEvLOvhxRL2kng",
  authDomain: "scouts-exams.firebaseapp.com",
  projectId: "scouts-exams",
  storageBucket: "scouts-exams.appspot.com",
  messagingSenderId: "897419344971",
  appId: "1:897419344971:web:dd3325a492cc57756d61ce",
  measurementId: "G-YB1DB8G1WG",
};

let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.error("Error initializing Firebase app:", error);
  throw error;
}

export const getMessagingInstance = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const supported = await isSupported();
    if (!supported) {
      console.log("Firebase messaging not supported in this browser");
      return null;
    }

    return getMessaging(app);
  } catch (error) {
    console.error("Error initializing Firebase messaging:", error);
    return null;
  }
};

export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) {
      console.log("Messaging not supported");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BJDPUgOL1f1s5051JlJVqiO_Ik_aj-brMltYdg8FuHa3MS45g06M_ae2yDvUDm99TI4-5myoFVluitL9AUay4mA",
        });

        if (currentToken) {
          return currentToken;
        } else {
          console.warn("No registration token available.");
          return null;
        }
      } catch (tokenError) {
        console.error("Error getting FCM token:", tokenError);

        console.log("Retrying FCM token generation after delay...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          const retryToken = await getToken(messaging, {
            vapidKey:
              "BJDPUgOL1f1s5051JlJVqiO_Ik_aj-brMltYdg8FuHa3MS45g06M_ae2yDvUDm99TI4-5myoFVluitL9AUay4mA",
          });

          if (retryToken) {
            return retryToken;
          }
        } catch (retryError) {
          console.error("Retry also failed:", retryError);
        }

        return null;
      }
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};

export const getExistingToken = async (): Promise<string | null> => {
  if (Notification.permission !== "granted") {
    return null;
  }

  try {
    const messaging = await getMessagingInstance();
    if (!messaging) {
      return null;
    }

    try {
      return await getToken(messaging, {
        vapidKey:
          "BJDPUgOL1f1s5051JlJVqiO_Ik_aj-brMltYdg8FuHa3MS45g06M_ae2yDvUDm99TI4-5myoFVluitL9AUay4mA",
      });
    } catch (tokenError) {
      console.error("Error getting existing FCM token:", tokenError);

      console.log("Retrying existing token retrieval after delay...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const retryToken = await getToken(messaging, {
          vapidKey:
            "BJDPUgOL1f1s5051JlJVqiO_Ik_aj-brMltYdg8FuHa3MS45g06M_ae2yDvUDm99TI4-5myoFVluitL9AUay4mA",
        });

        if (retryToken) {
          console.log("Existing FCM Token (retry):", retryToken);
          return retryToken;
        }
      } catch (retryError) {
        console.error("Retry for existing token also failed:", retryError);
      }

      return null;
    }
  } catch (error) {
    console.error("Error getting existing token:", error);
  }

  return null;
};

export const onMessageListener = async (
  callback: (payload: MessagePayload) => void,
) => {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) {
      console.log("Messaging not supported");
      return () => {};
    }

    return onMessage(messaging, (payload) => {
      callback(payload);
    });
  } catch (error) {
    console.error("Error setting up message listener:", error);
    return () => {};
  }
};

export const registerDevice = async (
  token: string,
  apiClient: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
): Promise<boolean> => {
  try {
    const parser = new UAParser();
    const result = parser.getResult();

    const deviceInfo = {
      registration_id: token,
      name: JSON.stringify({
        os: result.os,
        device: result.device,
        browser: result.browser.name || "Unknown",
      }),
      type: "web",
    };

    const response = await apiClient("/fcm/devices/", {
      method: "POST",
      body: JSON.stringify(deviceInfo),
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to register device:", errorData);
      return false;
    }
  } catch (error) {
    console.error("Error registering device:", error);
    return false;
  }
};

export default app;
