import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">O Epróbie</CardTitle>
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
          <CardTitle className="text-2xl font-bold">
            Pobierz aplikację
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.czaplicki.eproba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/get-it-on-google-play-pl.svg"
                alt="Google Play"
                width={200}
                height={59}
                className="border-1 border-gray-500 rounded-md"
              />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
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
                <p>
                  Na chwilę obecną nie planujemy stworzenia aplikacji na iOS,
                  ale Epróba jest dostępna jako aplikacja webowa PWA, która
                  działa na wszystkich urządzeniach z przeglądarką internetową.
                </p>
                <p>
                  Możesz dodać Epróbę do ekranu głównego swojego urządzenia, aby
                  korzystać z niej jak z natywnej aplikacji i dostawać
                  powiadomienia.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Co to jest &quot;Wiki&quot;?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Wiki to miejsce, gdzie możesz znaleźć informacje umieszczone
                  przez twoją kadrę lub organizację. Może zawierać informacje o
                  drużynie, regulaminy czy pomocne materiały. Każda drużyna może
                  mieć swoją własną Wiki, która jest dostępna dla wszystkich
                  członków drużyny.
                </p>
                <p>
                  Dodatkowo, będą się pojawiać tam informacje i nowości
                  dotyczące Epróby, które omogą Ci lepiej zrozumieć, jak
                  korzystać z aplikacji i jakie funkcje oferuje.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Regulaminy</CardTitle>
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
    </div>
  );
}
