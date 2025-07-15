import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulamin serwisu",
};

export default function TermsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Regulamin serwisu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Section title="I. Pojęcia ogólne">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Regulamin</strong> – niniejszy regulamin
            </li>
            <li>
              <strong>Serwis</strong> – serwis internetowych &quot;Epróba&quot;,
              działających pod adresem https://eproba.zhr.pl
            </li>
            <li>
              <strong>Usługodawca</strong> – właściciel serwisu jest Związek
              Harcerstwa Rzeczypospolitej z siedzibą w Warszawie (00-589) przy
              ul. Litewskiej 11/13, wpisany do Rejestru Stowarzyszeń Krajowego
              Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla M. St.
              Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru
              Sądowego, pod numerem KRS 0000057720
            </li>
            <li>
              <strong>Usługobiorca</strong> – każda osoba fizyczna, uzyskująca
              dostęp do Serwisu i korzystająca z usług świadczonych za
              pośrednictwem Serwisu przez Usługodawcę.
            </li>
            <li>
              <strong>Komunikacja Drogą Elektroniczną</strong> – Komunikacja
              pomiędzy stronami za pośrednictwem poczty elektronicznej (e-mail)
              oraz formularzy kontaktowych dostępnych na stronie www.
            </li>
          </ul>
        </Section>

        <Section title="II. Postanowienia ogólne">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Regulamin, określa zasady funkcjonowania i użytkowania Serwisu
              oraz określa zakres praw i obowiązków Usługobiorców i Usługodawcy
              związanych z użytkowaniem Serwisu.
            </li>
            <li>
              Przedmiotem usług Usługodawcy jest udostępnienie nieodpłatnych
              narzędzi w postaci Serwisu, umożliwiających Usługobiorcom dostęp
              do treści w postaci wpisów i formularzy elektronicznych (np. kart
              próby), związanych z zarządzaniem procesem prób i nadawania
              stopni.
            </li>
            <li>
              Wszelkie ewentualne treści, artykuły i informacje zawierające
              cechy wskazówek lub porad publikowane na łamach Serwisu są jedynie
              ogólnym zbiorem informacji i nie są kierowane do poszczególnych
              Usługobiorców. Usługodawca nie ponosi odpowiedzialności za
              wykorzystanie ich przez Usługobiorców.
            </li>
            <li>
              Usługodawca nie ponosi odpowiedzialności z tytułu ewentualnych
              szkód poniesionych przez Usługobiorców Serwisu lub osoby trzecie w
              związku z korzystaniem z Serwisu. Wszelkie ryzyko związane z
              korzystaniem z Serwisu, a w szczególności z używaniem i
              wykorzystywaniem informacji umieszczonych w Serwisie, ponosi
              Usługobiorca korzystający z usług Serwisu.
            </li>
          </ul>
        </Section>

        <Section title="III. Warunki używania Serwisu">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Używanie Serwisu przez każdego z Usługobiorców jest nieodpłatne i
              dobrowolne.
            </li>
            <li>
              Usługobiorcy mają obowiązek zapoznania się z Regulaminem oraz
              pozostałymi dokumentami stanowiącymi jego integralną część i muszą
              zaakceptować w całości jego postanowienia w celu dalszego
              korzystania z Serwisu.
            </li>
            <li>
              Usługobiorcy nie mogą wykorzystywać żadnych pozyskanych w Serwisie
              danych osobowych do celów marketingowych.
            </li>
            <li>
              Wymagania techniczne korzystania z Serwisu:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  urządzenie z wyświetlaczem umożliwiające wyświetlanie stron
                  internetowych,
                </li>
                <li>połączenie z internetem,</li>
                <li>
                  dowolna przeglądarka internetowa, która wyświetla strony
                  internetowe zgodnie ze standardami i postanowieniami
                  Konsorcjum W3C i obsługuje strony www udostępniane w języku
                  HTML5,
                </li>
                <li>włączoną obsługę skryptów JavaScript,</li>
                <li>włączoną obsługę plików Cookie</li>
              </ul>
            </li>
            <li>
              W celu zapewnienia bezpieczeństwa Usługodawcy, Usługobiorcy oraz
              innych Usługobiorców korzystających z Serwisu, wszyscy
              Usługobiorcy korzystający z Serwisu powinni stosować się do
              ogólnie przyjętych{" "}
              <a
                href="https://nety.pl/cyberbezpieczenstwo/zasady-ogolne-korzystania-z-sieci-internet/"
                className="text-[#1abc9c] hover:underline"
              >
                zasad bezpieczeństwa w sieci
              </a>
              ,
            </li>
            <li>
              Zabrania się działań wykonywanych osobiście przez Usługobiorców
              lub przy użyciu oprogramowania:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  bez zgody pisemnej, dekompilacji i analizy kodu źródłowego, za
                  wyjątkiem kodu źródłowego dostępnego publicznie na podstawie
                  licencji Open Source,
                </li>
                <li>
                  bez zgody pisemnej, powodujących nadmierne obciążenie serwera
                  Serwisu,
                </li>
                <li>
                  bez zgody pisemnej, prób wykrycia luk w zabezpieczeniach
                  Serwisu i konfiguracji serwera,
                </li>
                <li>
                  podejmowania prób wgrywania lub wszczykiwania na serwer i do
                  bazy danych kodu, skryptów i oprogramowania mogących wyrządzić
                  szkodę oprogramowaniu Serwisu, innym Usługobiorcom lub
                  Usługodawcy,
                </li>
                <li>
                  podejmowania prób wgrywania lub wszczykiwania na serwer i do
                  bazy danych kodu, skryptów i oprogramowania mogących śledzić
                  lub wykradać dane Usługobiorców lub Usługodawcy,
                </li>
                <li>
                  podejmowania jakichkolwiek działań mających na celu
                  uszkodzenie, zablokowanie działania Serwisu lub
                  uniemożliwienie realizacji celu w jakim działa Serwis.
                </li>
              </ul>
            </li>
            <li>
              W przypadku wykrycia zaistnienia lub potencjalnej możliwości
              zaistnienia incydentu Cyberbezpieczeństwa lub naruszenia RODO,
              Usługobiorcy w pierwszej kolejności powinni zgłosić ten fakt
              Usługodawcy w celu szybkiego usunięcia problemu / zagrożenia i
              zabezpieczenia interesów wszystkich Usługobiorców Serwisu.
            </li>
          </ul>
        </Section>

        <Section title="IV. Warunki oraz zasady rejestracji">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Użytkownikami mogą być wszystkie osoby fizyczne, lecz konta
              aktywne będą mieć wyłącznie osoby zrzeszone w Związku Harcerstwa
              Rzeczypospolitej.
            </li>
            <li>Rejestracja w Serwisie jest dobrowolna.</li>
            <li>Rejestracja w Serwisie jest nieodpłatna.</li>
            <li>
              Rejestrujący się w Serwisie Usługobiorcy wyrażają zgodę na
              przetwarzanie ich danych osobowych przez Usługobiorcę w zakresie w
              jakim zostały one wprowadzone do Serwisu podczas procesu
              rejestracji oraz ich późniejszych zmianom lub usunięciu.
            </li>
            <li>
              Usługodawca ma prawo zawieszać lub usuwać konta Usługobiorców
              według własnego uznania, uniemożliwiając lub ograniczając w ten
              sposób dostęp do poszczególnych lub wszystkich usług, treści,
              materiałów i zasobów Serwisu, w szczególności jeżeli Usługobiorca
              dopuści się łamania Regulaminu, powszechnie obowiązujących
              przepisów prawa, zasad współżycia społecznego lub działa na szkodę
              Usługodawcy lub innych Usługobiorców, uzasadnionego interesu
              Usługodawcy oraz podmiotów trzecich współpracujących lub nie z
              Usługodawcą.
            </li>
            <li>
              Wszelkie usługi Serwisu mogą być zmieniane co do ich treści i
              zakresu, dodawane lub odejmowane, a także czasowo zawieszane lub
              dostęp do nich może być ograniczany, według swobodnej decyzji
              Usługodawcy, bez możliwości wnoszenia sprzeciwu w tym zakresie
              przez Usługobiorców.
            </li>
            <li>
              Dodatkowe zasady bezpieczeństwa w zakresie korzystania z konta:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  Zabrania się Usługobiorcom zarejestrowanym w Serwisie do
                  udostępniania loginu oraz hasła do swojego konta osobom
                  trzecim.
                </li>
                <li>
                  Usługodawca nie ma prawa i nigdy nie będzie zażądać od
                  Usługobiorcy hasła do wybranego konta.
                </li>
              </ul>
            </li>
            <li>
              Usuwanie konta:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  Każdy Usługobiorca posiadający konto w Serwisie ma możliwość
                  samodzielnego usunięcia konta z Serwisu.
                </li>
                <li>
                  Usługobiorcy mogą to uczynić po zalogowaniu się do Serwisu w
                  zakładce &quot;Profil&quot; i wybraniu opcji &quot;Usuń
                  konto&quot;.
                </li>
                <li>
                  Usunięcie konta skutkuje usunięciem wszelkich danych
                  identyfikacyjnych Usługobiorcy oraz anonimizacją nazwy
                  użytkownika i adresu e-mail.
                </li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="V. Przekazanie praw do materiałów umieszczanych przez użytkowników">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Usługobiorcy, umieszczając jakiekolwiek materiały w Serwisie, w
              tym teksty, zdjęcia, grafiki, nagrania wideo, dźwięki, lub inne
              treści, przekazują na rzecz Usługodawcy pełne prawa własności
              intelektualnej do tych materiałów, w tym autorskie prawa majątkowe
              i prawa pokrewne.
            </li>
            <li>
              Przekazanie praw obejmuje prawo do nieograniczonego w czasie i
              przestrzeni korzystania z materiałów, w tym ich kopiowania,
              modyfikowania, rozpowszechniania, publicznego odtwarzania oraz
              przekazywania osobom trzecim.
            </li>
            <li>
              Usługodawca ma prawo do wykorzystywania materiałów umieszczonych
              przez Usługobiorców w celach komercyjnych oraz niekomercyjnych, w
              tym w ramach promocji i reklamy Serwisu.
            </li>
          </ul>
        </Section>

        <Section title="VI. Warunki komunikacji i świadczenia pozostałych usług w Serwisie">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Serwis udostępnia usługi i narzędzia umożliwiające Usługobiorcom
              interakcję z Serwisem w postaci:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>Formularzu kontaktowego</li>
                <li>Formularzu rejestracyjnym</li>
              </ul>
            </li>
            <li>
              Serwis udostępnia dane kontaktowe w postaci:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>Adresu e-mail</li>
              </ul>
            </li>
            <li>
              W przypadku kontaktu Usługobiorcy z Usługodawcą, dane osobowe
              Usługobiorców będą przetwarzane zgodnie z &quot;
              <Link
                href="/terms/privacy-policy"
                className="text-[#1abc9c] hover:underline"
              >
                Polityką Prywatności
              </Link>
              &quot;, stanowiącą integralną część Regulaminu.
            </li>
          </ul>
        </Section>

        <Section title="VII. Gromadzenie danych o Usługobiorcach">
          <ul className="list-inside list-disc space-y-2">
            <li>
              W celu prawidłowego świadczenia usług przez Serwis, zabezpieczenia
              prawnego interesu Usługodawcy oraz w celu zapewnienia zgodności
              działania Serwisu z obowiązującym prawem, Usługodawca za
              pośrednictwem Serwisu gromadzi i przetwarza niektóre dane o
              Użytkownikach.
            </li>
            <li>
              W celu prawidłowego świadczenia usług, Serwis wykorzystuje i
              zapisuje niektóre anonimowe informacje o Usługobiorcy w plikach
              cookies.
            </li>
            <li>
              Zakres, cele, sposób oraz zasady przetwarzania danych dostępne są
              w załącznikach do Regulaminu: &quot;
              <Link
                href="/terms/gdpr"
                className="text-[#1abc9c] hover:underline"
              >
                Obowiązek informacyjny RODO
              </Link>
              &quot; oraz w &quot;
              <Link
                href="/terms/privacy-policy"
                className="text-[#1abc9c] hover:underline"
              >
                Polityce prywatności
              </Link>
              &quot;, stanowiących integralną część Regulaminu.
            </li>
            <li>
              W przypadku Usługobiorców zalogowanych (posiadających konto w
              Serwisie), w plikach cookies zapisywanych na urządzeniu
              Usługobiorcy może być umieszczony identyfikator Usługobiorcy
              powiązany z kontem Usługobiorcy
            </li>
          </ul>
        </Section>

        <Section title="VIII. Prawa autorskie">
          <ul className="list-inside list-disc space-y-2">
            <li>Właścicielem Serwisu jest Usługodawca.</li>
            <li>
              Właścicielem praw autorskich do serwisu jest Antoni Czaplicki.
            </li>
            <li>
              Część danych zamieszczonych w Serwisie są chronione prawami
              autorskimi należącymi do firm, instytucji i osób trzecich,
              niepowiązanych w jakikolwiek sposób z Usługodawcą, i są
              wykorzystywane na podstawie uzyskanych licencji, lub opartych na
              licencji darmowej.
            </li>
            <li>
              Na podstawie Ustawy z dnia 4 lutego 1994 o prawie autorskim
              zabrania się wykorzystywania, kopiowania, reprodukowania w
              jakiejkolwiek formie oraz przetrzymywania w systemach wyszukiwania
              z wyłączeniem wyszukiwarki Google, Bing, Yahoo, NetSprint,
              DuckDuckGo, Facebook oraz LinkedIn jakichkolwiek artykułów,
              opisów, zdjęć oraz wszelkich innych treści, materiałów
              graficznych, wideo lub audio znajdujących się w Serwisie bez
              pisemnej zgody lub zgody przekazanej za pomocą Komunikacji Drogą
              Elektroniczną ich prawnego właściciela.
            </li>
            <li>
              Zgodnie z Ustawą z dnia 4 lutego 1994 o prawie autorskim ochronie
              nie podlegają proste informacje prasowe, rozumiane jako same
              informacje, bez komentarza i oceny ich autora. Autor rozumie to
              jako możliwość wykorzystywania informacji z zamieszczonych w
              serwisie tekstów, ale już nie kopiowania całości lub części
              artykułów o ile nie zostało to oznaczone w poszczególnym materiale
              udostępnionym w Serwisie.
            </li>
          </ul>
        </Section>

        <Section title="IX. Zmiany Regulaminu">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Wszelkie postanowienia Regulaminu mogą być w każdej chwili
              jednostronnie zmieniane przez Usługodawcę, bez podawania przyczyn.
            </li>
            <li>
              Informacja o zmianie Regulaminu będzie publikowana na stronie
              Serwisu. Usługobiorcy są zobowiązani do regularnego sprawdzania
              Regulaminu pod kątem wprowadzonych zmian.
            </li>
            <li>
              W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie
              natychmiast po jego publikacji dla Usługobiorców nieposiadających
              konta w Serwisie.
            </li>
            <li>
              W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie z
              7-dniowym okresem przejściowym dla Usługobiorców posiadających
              konta w Serwisie zarejestrowane przed zmianą Regulaminu.
            </li>
            <li>
              Traktuje się, że każdy Usługobiorca, kontynuujący korzystanie z
              Serwisu po zmianie Regulaminu, akceptuje go w całości.
            </li>
          </ul>
        </Section>

        <Section title="X. Postanowienia końcowe">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Usługodawca dokona wszelkich starań by usługi Serwisu były
              oferowane w sposób ciągły. Nie ponosi on jednak żadnej
              odpowiedzialności za zakłócenia spowodowane siłą wyższą lub
              niedozwoloną ingerencją Usługobiorców, osób trzecich czy
              działalnością zewnętrznych automatycznych programów.
            </li>
            <li>
              Usługodawca zastrzega sobie prawo do zmiany jakichkolwiek
              informacji umieszczonych w Serwisie w wybranym przez Usługodawcę
              terminie, bez konieczności uprzedniego powiadomienia Usługobiorców
              korzystających z usług Serwisu.
            </li>
            <li>
              Usługodawca zastrzega sobie prawo do czasowego, całkowitego lub
              częściowego wyłączenia Serwisu w celu jego ulepszenia, dodawania
              usług lub przeprowadzania konserwacji, bez wcześniejszego
              uprzedzania o tym Usługobiorców.
            </li>
            <li>
              Usługodawca zastrzega sobie prawo do wyłączenia Serwisu na stałe,
              bez wcześniejszego uprzedzania o tym Usługobiorców.
            </li>
            <li>
              Usługodawca zastrzega sobie prawo do dokonania cesji w części lub
              w całości wszelkich swoich praw i obowiązków związanych z
              Serwisem, bez zgody i możliwości wyrażania jakichkolwiek
              sprzeciwów przez Usługobiorców.
            </li>
            <li>
              Obowiązujące oraz poprzednie Regulaminy Serwisu znajduję się na
              tej podstronie pod aktualnym Regulaminem.
            </li>
            <li>
              We wszelkich sprawach związanych z działalnością Serwisu należy
              kontaktować się z Usługodawcę korzystając z jednej z poniższych
              form kontaktu:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>Używając formularza kontaktowego dostępnego w Serwisie</li>
                <li>Wysyłając wiadomość na adres e-mail: eproba@zhr.pl</li>
              </ul>
              <p className="mt-2">
                Kontakt przy użyciu wskazanych środków komunikacji wyłącznie w
                sprawach związanych z prowadzonym Serwisem.
              </p>
            </li>
          </ul>
        </Section>
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mt-6 mb-4 text-2xl font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
