"use client";

import { Button } from "@/components/ui/button";
import { useIsStandalone } from "@/lib/hooks/use-is-standalone";
import { CheckIcon, DownloadIcon } from "lucide-react";

export function PwaInstallButton() {
  const isStandalone = useIsStandalone();

  if (isStandalone) {
    return (
      <Button variant="outline" disabled>
        <CheckIcon />
        Jesteś w aplikacji
      </Button>
    );
  }

  return (
    <Button variant="outline">
      <DownloadIcon />
      Zainstaluj na tym urządzeniu
    </Button>
  );
}
