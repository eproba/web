import { API_URL, ApiError } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    accessToken?: string;
  } | null;
}

export function createApiClient(
  getSession: () => Promise<Session | null>,
  updateSession?: () => Promise<Session | null>,
) {
  let accessToken = "";
  let isRefreshing = false;

  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    // Ensure we have the latest session
    let session = await getSession();
    if (!session && updateSession && !isRefreshing) {
      isRefreshing = true;
      try {
        session = await updateSession();
        isRefreshing = false;
      } catch (error) {
        isRefreshing = false;
        throw error;
      }
    }
    if (!session) {
      throw new ApiError("Session not found", 401, "Unauthorized");
    }
    accessToken = session?.session?.accessToken || "";

    const executeRequest = async (): Promise<Response> => {
      const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
        ...(init?.headers || {}),
      };

      // Only set Content-Type for non-FormData requests
      if (!(init?.body instanceof FormData)) {
        (headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }

      const response = await fetch(API_URL + input, {
        ...init,
        headers,
      });

      if (response.status === 401 && updateSession && !isRefreshing) {
        isRefreshing = true;
        try {
          const newSession = await updateSession();
          accessToken = newSession?.session?.accessToken || "";
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
    };

    return executeRequest();
  };
}

export function useApi() {
  const { data: session, refetch, isPending } = authClient.useSession();
  const sessionRef = useRef<Session | null>(null);
  const statusRef = useRef(isPending ? "loading" : session ? "authenticated" : "unauthenticated");
  const [isReady, setIsReady] = useState(false);

  // Track session status and set ready state
  useEffect(() => {
    const status = isPending ? "loading" : session ? "authenticated" : "unauthenticated";
    statusRef.current = status;

    if (status !== "loading") {
      setIsReady(true);
      sessionRef.current = session as Session | null;
      return;
    }

    const timeoutId = setTimeout(() => setIsReady(true), 5000);
    return () => clearTimeout(timeoutId);
  }, [isPending, session]);

  const getSession = useCallback(async () => {
    const status = statusRef.current;
    if (status !== "loading") {
      return session as Session | null;
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
  }, [session]);

  const updateSession = useCallback(async () => {
    await refetch();
    return session as Session | null;
  }, [refetch, session]);

  const apiClient = useMemo(
    // eslint-disable-next-line react-hooks/refs
    () => createApiClient(getSession, updateSession),
    [getSession, updateSession],
  );

  return { apiClient, isApiReady: isReady, updateSession };
}
