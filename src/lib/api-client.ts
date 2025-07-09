import { API_URL, ApiError } from "@/lib/api";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function createApiClient(
  getSession: () => Promise<Session | null>,
  updateSession?: () => Promise<Session | null>,
) {
  let accessToken = "";
  let isRefreshing = false;

  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    // Ensure we have the latest session
    const session = await getSession();
    if (!session) {
      throw new ApiError("Session not found", 401, "Unauthorized");
    }
    accessToken = session?.accessToken || "";

    const executeRequest = async (): Promise<Response> => {
      // Check if offline before making request
      if (!navigator.onLine) {
        throw new ApiError("Brak połączenia z internetem", 0, "Offline");
      }

      const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers || {}),
      };

      // Only set Content-Type for non-FormData requests
      if (!(init?.body instanceof FormData)) {
        (headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }

      try {
        const response = await fetch(API_URL + input, {
          ...init,
          headers,
        });

        if (response.status === 401 && updateSession && !isRefreshing) {
          isRefreshing = true;
          try {
            const newSession = await updateSession();
            accessToken = newSession?.accessToken || "";
            isRefreshing = false;
            return executeRequest(); // Retry with new token
          } catch (error) {
            isRefreshing = false;
            throw error;
          }
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ApiError(
            Object.keys(errorData).length > 0
              ? errorData.detail || JSON.stringify(errorData)
              : response.statusText,
            response.status,
            response.statusText,
            errorData,
          );
        }

        return response;
      } catch (error) {
        // If it's a network error and we're offline, throw offline error
        if (!navigator.onLine) {
          throw new ApiError("Brak połączenia z internetem", 0, "Offline");
        }
        // Re-throw other errors
        throw error;
      }
    };

    return executeRequest();
  };
}

export function useApi() {
  const { data: session, update, status } = useSession();
  const sessionRef = useRef<Session | null>(null);
  const statusRef = useRef(status);
  const [isReady, setIsReady] = useState(false);

  // Track session status and set ready state
  useEffect(() => {
    statusRef.current = status;

    if (status !== "loading") {
      setIsReady(true);
      sessionRef.current = session;
      return;
    }

    const timeoutId = setTimeout(() => setIsReady(true), 5000);
    return () => clearTimeout(timeoutId);
  }, [status, session]);

  const getSession = useCallback(async () => {
    if (status !== "loading") {
      return session;
    }

    return new Promise<Session | null>((resolve) => {
      const checkSession = () => {
        if (statusRef.current !== "loading" || isTimedOut) {
          if (!isTimedOut) {
            clearTimeout(timeoutId);
            resolve(sessionRef.current);
          }
          return;
        }
        setTimeout(checkSession, 100);
      };

      let isTimedOut = false;
      const timeoutId = setTimeout(() => {
        isTimedOut = true;
        resolve(null);
      }, 5000);

      checkSession();
    });
  }, [session, status, sessionRef, statusRef]);

  const apiClient = useMemo(
    () => createApiClient(getSession, update),
    [getSession, update],
  );

  return { apiClient, isApiReady: isReady, updateSession: update };
}
