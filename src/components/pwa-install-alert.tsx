"use client";

import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useIsStandalone } from "@/lib/hooks/use-is-standalone";
import { DownloadIcon, XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const PWA_INSTALL_ALERT_DISMISSED_KEY = "pwa-install-alert-dismissed";

export function PwaInstallAlert() {
  const [isDismissed, setIsDismissed] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isStandalone = useIsStandalone();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const dismissed = localStorage.getItem(PWA_INSTALL_ALERT_DISMISSED_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(PWA_INSTALL_ALERT_DISMISSED_KEY, "true");
    setIsDismissed(true);
  };

  if (
    isStandalone ||
    ((isDismissed || !isMobile || pathname === "/about") &&
      searchParams.get("install") !== "true")
  ) {
    return null;
  }

  return (
    <PwaInstallPrompt onDismiss={handleDismiss}>
      <Alert className="container mx-auto mt-2">
        <DownloadIcon className="size-4" />
        <AlertTitle className="flex items-center justify-between gap-2 font-semibold">
          Zainstaluj aplikację
          <XIcon className="size-4 cursor-pointer" onClick={handleDismiss} />
        </AlertTitle>
        <AlertDescription className="text-sm text-gray-500">
          I miej swoje próby zawsze pod ręką
        </AlertDescription>
      </Alert>
    </PwaInstallPrompt>
  );
}
