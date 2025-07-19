import { PwaInstallButton } from "@/components/pwa-install-button";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VersionInfo } from "@/components/version-info";
import { API_VERSION } from "@/lib/api";
import { fetchApiConfig } from "@/lib/server-api";
import { QrCodeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

import packageInfo from "../../../package.json";

export const metadata: Metadata = {
  title: "O Epróbie",
};

export default async function AboutPage() {
  const { config: apiConfig, error } = await fetchApiConfig();

  if (error || !apiConfig) {
    return error || <div>Failed to load API configuration</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">O Epróbie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              Aplikacja Epróba została stworzona w lutym 2021 roku, zaczynając
              od obsługi drużyn w Zielonej Górze. W 2024 roku aplikacja została
              przeniesiona na serwery zhr.pl i od tego czasu obsługuje drużyny z
              całej Polski.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Pobierz aplikację
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-start gap-2">
            <PwaInstallPrompt>
              <PwaInstallButton />
            </PwaInstallPrompt>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <QrCodeIcon className="size-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zainstaluj na innym urządzeniu</DialogTitle>
                  <DialogDescription>
                    Zeskanuj kod QR, aby otworzyć lub zainstalować aplikację na
                    twoim telefonie, tablecie lub komputerze.
                  </DialogDescription>
                  <QRCodeSVG
                    value="https://eproba.zhr.pl?install=true"
                    level="H"
                    size={256}
                    className="mx-auto mt-4 h-full max-w-full rounded-lg bg-white p-4"
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            FAQ - Najczęściej zadawane pytania
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Jak mogę dodać swoją drużynę do Epróby?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Aby dodać swoją drużynę do Epróby, skontaktuj się z drużynowym
                  lub innym członkiem kadry drużyny. Mogą oni wypełnić formularz
                  zgłoszeniowy dostępny na stronie{" "}
                  <Link
                    href="/team/request"
                    className="text-[#1abc9c] hover:underline"
                  >
                    eproba.zhr.pl/teams/request
                  </Link>
                  .
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Czy mogę korzystać z Epróby bez aplikacji mobilnej?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Tak, Epróba jest dostępna również jako aplikacja webowa.
                  Możesz korzystać z niej na dowolnym urządzeniu z przeglądarką
                  internetową.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Znalazłem błąd w aplikacji, co mogę zrobić?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Jeśli napotkałeś błąd lub masz sugestię, możesz zgłosić to
                  poprzez{" "}
                  <Link
                    href="/contact"
                    className="text-[#1abc9c] hover:underline"
                  >
                    formularz kontaktowy
                  </Link>{" "}
                  lub bezpośrednio na{" "}
                  <a
                    href="https://github.com/eproba/web-v2/issues"
                    className="text-[#1abc9c] hover:underline"
                  >
                    GitHubie
                  </a>
                  .
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Kiedy będzie dostępna synchroniazacja z cz!appką?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Synchronizacja z cz!appką jest planowana, ale nie mamy jeszcze
                  konkretnej daty jej wdrożenia. O postępach będziemy informować
                  na stronie.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Czy powstanie aplikacja na iOS?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    Na chwilę obecną nie planujemy stworzenia aplikacji na iOS,
                    ale Epróba jest dostępna jako aplikacja webowa PWA, która
                    działa na wszystkich urządzeniach z przeglądarką
                    internetową.
                  </p>
                  <p>
                    Możesz dodać Epróbę do ekranu głównego swojego urządzenia,
                    aby korzystać z niej jak z natywnej aplikacji i dostawać
                    powiadomienia.
                  </p>
                  <PwaInstallPrompt>
                    <PwaInstallButton />
                  </PwaInstallPrompt>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Regulaminy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <ul className="list-disc pl-5">
              <li>
                <Link
                  href="/terms/privacy-policy"
                  className="text-[#1abc9c] hover:underline"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/terms/terms-of-service"
                  className="text-[#1abc9c] hover:underline"
                >
                  Regulamin serwisu
                </Link>
              </li>
              <li>
                <Link
                  href="/terms/gdpr"
                  className="text-[#1abc9c] hover:underline"
                >
                  Obowiązek informacyjny RODO
                </Link>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <VersionInfo
        appVersion={packageInfo.version}
        serverVersion={apiConfig.serverVersion}
        serverApiVersion={apiConfig.apiVersion}
        clientApiVersion={API_VERSION}
      />
    </div>
  );
}
