"use client";

import { Button } from "@/components/ui/button";
import type { ApiError } from "@/lib/api";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ErrorAlert({ error }: { error: Response | ApiError }) {
  console.error(error);
  const errorMessage = "message" in error ? error.message : error.toString();
  return (
    <Alert variant="destructive">
      <AlertCircleIcon className="size-4" />
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
            className="font-bold underline"
            href="https://github.com/eproba/web/issues"
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
