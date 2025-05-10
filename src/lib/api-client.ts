// lib/api-client.ts
import { API_URL, ApiError } from "@/lib/api";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function createApiClient(
  session: Session | null,
  updateSession?: () => Promise<Session | null>,
) {
  let accessToken = session?.accessToken || "";

  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    let response = await fetch(API_URL + input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...init?.headers,
      },
    });

    // If unauthorized, try to refresh token
    if (response.status === 401 && updateSession) {
      const newSession = await updateSession();
      accessToken = newSession?.accessToken || "";

      if (accessToken) {
        response = await fetch(API_URL + input, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            ...init?.headers,
          },
        });
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.detail || response.statusText,
        response.status,
        response.statusText,
      );
    }

    return response;
  };
}

export function useApi() {
  const { data: session, update } = useSession();
  return useMemo(() => createApiClient(session, update), [session, update]);
}
