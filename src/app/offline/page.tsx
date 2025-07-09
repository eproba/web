"use client";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon, WifiOffIcon } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="space-y-4">
        <WifiOffIcon className="w-24 h-24 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold">Jesteś offline</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Wygląda na to, że nie masz połączenia z internetem. Niektóre funkcje
          mogą być niedostępne.
        </p>
      </div>

      <div className="space-y-4 flex flex-col items-center">
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCwIcon className="size-4" />
          Spróbuj ponownie
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>
            Sprawdź swoje połączenie internetowe lub spróbuj ponownie później.
          </p>
        </div>
      </div>
    </div>
  );
}
