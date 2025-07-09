import { ErrorAlert } from "@/components/error-alert";
import type { ApiError } from "@/lib/api";
import { JSX } from "react";

export async function handleError(response: Response): Promise<JSX.Element> {
  // Check if user is offline
  const isOffline = !navigator.onLine;

  // If offline, return a specific offline error
  if (isOffline) {
    return (
      <ErrorAlert
        error={
          {
            message:
              "Brak połączenia z internetem. Sprawdź połączenie i spróbuj ponownie.",
            status: 0,
            statusText: "Offline",
          } as ApiError
        }
      />
    );
  }

  try {
    const error = await response.json();
    return (
      <ErrorAlert
        error={
          {
            message: error.detail || "Nieznany błąd",
            status: response.status,
            statusText: response.statusText,
          } as ApiError
        }
      />
    );
  } catch {
    return (
      <ErrorAlert
        error={
          {
            message: "Nieznany błąd",
            status: response.status,
            statusText: response.statusText,
          } as ApiError
        }
      />
    );
  }
}
