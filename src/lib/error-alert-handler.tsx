import { ErrorAlert } from "@/components/error-alert";
import type { ApiError } from "@/lib/api";
import { JSX } from "react";

export async function handleError(response: Response): Promise<JSX.Element> {
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
