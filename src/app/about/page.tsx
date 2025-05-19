import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">O serwisie</h1>
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
        <CardContent>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Jak zacząć?</h1>
            <p>
              Aby dodać swoją drużynę do Epróby, wystarczy wypełnić formularz
              zgłoszeniowy. Po weryfikacji zgłoszenia, drużyna zostanie dodana
              do bazy danych i będzie widoczna na stronie. Formularz
              zgłoszeniowy znajduje się pod adresem{" "}
              <Link
                href="/teams/request"
                className="text-[#1abc9c] hover:underline"
              >
                eproba.zhr.pl/teams/request
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Pobierz aplikację</h1>
            <a
              href="https://play.google.com/store/apps/details?id=com.czaplicki.eproba"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://placehold.co/200x59?text=Google+Play"
                alt="Google Play"
                width={200}
                height={59}
              />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Regulaminy</h1>
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
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
