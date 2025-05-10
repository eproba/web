"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type { ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";

export function ErrorAlert({ error }: { error: Response | ApiError }) {
  console.error(error);
  const errorMessage = "message" in error ? error.message : error.toString();
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        Wystąpił błąd i ta strona nie może być wyświetlona
      </AlertTitle>
      <AlertDescription>
        <p>
          Błąd:{" "}
          <b>
            {error.status} {error.statusText}
          </b>
        </p>
        <p>Szczegóły błędu: {errorMessage}</p>
        <br />
        <p>
          Spróbuj odświeżyć stronę, jeśli to nie pomoże, zgłoś błąd{" "}
          <a
            className="underline font-bold"
            href="https://github.com/eproba/web-v2/issues"
            target="_blank"
          >
            tutaj
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Odśwież stronę
        </Button>
      </AlertDescription>
    </Alert>
  );
}
