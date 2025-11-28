"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsStandalone } from "@/lib/hooks/use-is-standalone";
import { Share } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

interface PwaInstallPromptProps {
  children: ReactNode;
  onDismiss?: () => void;
}

export function PwaInstallPrompt({
  children,
  onDismiss,
}: PwaInstallPromptProps) {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isStandalone = useIsStandalone();
  const searchParams = useSearchParams();
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isFallbackInstructionsOpen, setIsFallbackInstructionsOpen] =
    useState(false);
  const [isAutoInstallModalOpen, setIsAutoInstallModalOpen] = useState(false);
  const installTriggered = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const isIos =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isMac =
    typeof window !== "undefined" && /Macintosh/.test(navigator.userAgent);

  const isSafari =
    typeof window !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const isMacSafari = isMac && isSafari;

  const handleAutoInstall = () => {
    handleInstallClick();
    setIsAutoInstallModalOpen(false);
    if (onDismiss) {
      onDismiss();
    }
    router.replace(pathname);
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleInstallClick = useCallback(() => {
    if (isStandalone) {
      return;
    }

    const isAndroid =
      typeof window !== "undefined" && /android/i.test(navigator.userAgent);

    if (isAndroid) {
      window.open(
        "https://play.google.com/store/apps/details?id=pl.zhr.eproba.pwa",
        "_blank",
      );
      if (onDismiss) {
        onDismiss();
      }
      return;
    }

    if (installPromptEvent) {
      installPromptEvent.prompt();
    } else if (isIos || isMacSafari) {
      setIsInstructionsOpen(true);
    } else {
      // Fallback for other browsers that don't support the prompt but are not iOS
      setIsFallbackInstructionsOpen(true);
    }
    router.replace(pathname);
  }, [
    installPromptEvent,
    isIos,
    isMacSafari,
    isStandalone,
    onDismiss,
    pathname,
    router,
  ]);

  useEffect(() => {
    if (
      searchParams.get("install") === "true" &&
      !installTriggered.current &&
      (installPromptEvent || isIos || isMacSafari)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAutoInstallModalOpen(true);
      installTriggered.current = true;
    }
  }, [installPromptEvent, isIos, isMacSafari, pathname, router, searchParams]);

  const iosInstructions = (
    <div className="space-y-4 p-4 text-center">
      <p>
        Aby zainstalować aplikację Epróba na swoim urządzeniu, wykonaj poniższe
        kroki:
      </p>
      <ol className="list-inside list-decimal space-y-2 text-left">
        <li>
          Naciśnij przycisk udostępniania <Share className="inline h-4 w-4" /> w
          pasku nawigacyjnym przeglądarki.
        </li>
        <li>Przewiń w dół i wybierz &quot;Dodaj do ekranu głównego&quot;.</li>
        <li>Potwierdź, naciskając &quot;Dodaj&quot; w prawym górnym rogu.</li>
      </ol>
      <p>
        Aplikacja pojawi się na ekranie głównym, zapewniając szybki dostęp i
        powiadomienia.
      </p>
    </div>
  );

  const macSafariInstructions = (
    <div className="space-y-4 p-4 text-center">
      <p>
        Aby zainstalować aplikację Epróba na swoim komputerze Mac, wykonaj
        poniższe kroki:
      </p>
      <ol className="list-inside list-decimal space-y-2 text-left">
        <li>
          W przeglądarce Safari, kliknij przycisk udostępniania{" "}
          <Share className="inline h-4 w-4" /> w pasku narzędzi.
        </li>
        <li>Wybierz &quot;Dodaj do Docka&quot;.</li>
        <li>
          Możesz zmienić nazwę aplikacji, a następnie kliknij &quot;Dodaj&quot;.
        </li>
      </ol>
      <p>Aplikacja pojawi się w Docku, zapewniając szybki dostęp.</p>
    </div>
  );

  const instructions = isIos ? iosInstructions : macSafariInstructions;
  const instructionTitle = isIos
    ? "Instrukcja instalacji na iOS"
    : "Instrukcja instalacji na macOS";

  const fallbackInstructions = (
    <div className="space-y-4 p-4 text-center">
      <p>
        Aby zainstalować aplikację, poszukaj opcji &apos;Dodaj do ekranu
        głównego&apos; w menu przeglądarki. Jeśli już jest zainstalowana, możesz
        ją otworzyć z ekranu głównego.
      </p>
    </div>
  );

  return (
    <>
      <div
        onClick={handleInstallClick}
        className="cursor-pointer"
        aria-label="Zainstaluj aplikację PWA"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleInstallClick();
          }
        }}
      >
        {children}
      </div>

      <Dialog
        open={isAutoInstallModalOpen}
        onOpenChange={(open) => {
          setIsAutoInstallModalOpen(open);
          if (!open && onDismiss) {
            onDismiss();
          }
          router.replace(pathname);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zainstaluj aplikację</DialogTitle>
            <DialogDescription>
              Kliknij przycisk poniżej, aby zainstalować aplikację na swoim
              urządzeniu i korzystać z niej w trybie offline.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleAutoInstall}>Zainstaluj</Button>
            <DialogClose asChild>
              <Button variant="outline">Anuluj</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {(isIos || isMacSafari) &&
        (isDesktop ? (
          <Dialog
            open={isInstructionsOpen}
            onOpenChange={(open) => {
              setIsInstructionsOpen(open);
              if (!open && onDismiss) {
                onDismiss();
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{instructionTitle}</DialogTitle>
                <DialogDescription asChild>{instructions}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Zamknij</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer
            open={isInstructionsOpen}
            onOpenChange={(open) => {
              setIsInstructionsOpen(open);
              if (!open && onDismiss) {
                onDismiss();
              }
            }}
          >
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{instructionTitle}</DrawerTitle>
                <DrawerDescription asChild>{instructions}</DrawerDescription>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Zamknij</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        ))}

      {isDesktop ? (
        <Dialog
          open={isFallbackInstructionsOpen}
          onOpenChange={(open) => {
            setIsFallbackInstructionsOpen(open);
            if (!open && onDismiss) {
              onDismiss();
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Instrukcja instalacji</DialogTitle>
              <DialogDescription asChild>
                {fallbackInstructions}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Zamknij</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isFallbackInstructionsOpen}
          onOpenChange={(open) => {
            setIsFallbackInstructionsOpen(open);
            if (!open && onDismiss) {
              onDismiss();
            }
          }}
        >
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Instrukcja instalacji</DrawerTitle>
              <DrawerDescription asChild>
                {fallbackInstructions}
              </DrawerDescription>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Zamknij</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
