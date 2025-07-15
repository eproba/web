import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności",
};

export default function PrivacyPolicyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Polityka Prywatności
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Poniższa Polityka Prywatności określa{" "}
          <strong>
            zasady zapisywania i uzyskiwania dostępu do danych na Urządzeniach
            Użytkowników
          </strong>{" "}
          korzystających z Serwisu do celów świadczenia usług drogą
          elektroniczną przez Administratora oraz{" "}
          <strong>
            zasady gromadzenia i przetwarzania danych osobowych Użytkowników
          </strong>
          , które zostały podane przez nich osobiście i dobrowolnie za
          pośrednictwem narzędzi dostępnych w Serwisie.
        </p>
        <p>
          Poniższa Polityka Prywatności jest integralną częścią{" "}
          <Link
            href="/terms/terms-of-service"
            className="text-[#1abc9c] hover:underline"
          >
            Regulaminu Serwisu
          </Link>
          , który określa zasady, prawa i obowiązki Użytkowników korzystających
          z Serwisu.
        </p>

        <Section title="§1 Definicje">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Serwis</strong> - serwis internetowy &quot;Epróba&quot;
              działający pod adresem https://eproba.zhr.pl
            </li>
            <li>
              <strong>Serwis zewnętrzny</strong> - serwisy internetowe
              partnerów, usługodawców lub usługobiorców współpracujących z
              Administratorem
            </li>
            <li>
              <strong>Administrator Serwisu / Danych</strong> - Administratorem
              Serwisu oraz Administratorem Danych jest Związek Harcerstwa
              Rzeczypospolitej z siedzibą w Warszawie (00-589) przy ul.
              Litewskiej 11/13, wpisany do Rejestru Stowarzyszeń Krajowego
              Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla M. St.
              Warszawy w Warszawie, XII Wydział Gospodarczy Krajowego Rejestru
              Sądowego, pod numerem KRS 0000057720
            </li>
            <li>
              <strong>Użytkownik</strong> - osoba fizyczna, dla której
              Administrator świadczy usługi drogą elektroniczną za pośrednictwem
              Serwisu.
            </li>
            <li>
              <strong>Urządzenie</strong> - elektroniczne urządzenie wraz z
              oprogramowaniem, za pośrednictwem którego Użytkownik uzyskuje
              dostęp do Serwisu
            </li>
            <li>
              <strong>Cookies (ciasteczka)</strong> - dane tekstowe gromadzone w
              formie plików zamieszczanych na Urządzeniu Użytkownika
            </li>
            <li>
              <strong>RODO</strong> - Rozporządzenie Parlamentu Europejskiego i
              Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony
              osób fizycznych w związku z przetwarzaniem danych osobowych i w
              sprawie swobodnego przepływu takich danych oraz uchylenia
              dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)
            </li>
            <li>
              <strong>Dane osobowe</strong> - oznaczają informacje o
              zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej
              („osobie, której dane dotyczą”); możliwa do zidentyfikowania osoba
              fizyczna to osoba, którą można bezpośrednio lub pośrednio
              zidentyfikować, w szczególności na podstawie identyfikatora
              takiego jak imię i nazwisko, numer identyfikacyjny, dane o
              lokalizacji, identyfikator internetowy lub jeden bądź kilka
              szczególnych czynników określających fizyczną, fizjologiczną,
              genetyczną, psychiczną, ekonomiczną, kulturową lub społeczną
              tożsamość osoby fizycznej
            </li>
            <li>
              <strong>Przetwarzanie</strong> - oznacza operację lub zestaw
              operacji wykonywanych na danych osobowych lub zestawach danych
              osobowych w sposób zautomatyzowany lub niezautomatyzowany, taką
              jak zbieranie, utrwalanie, organizowanie, porządkowanie,
              przechowywanie, adaptowanie lub modyfikowanie, pobieranie,
              przeglądanie, wykorzystywanie, ujawnianie poprzez przesłanie,
              rozpowszechnianie lub innego rodzaju udostępnianie, dopasowywanie
              lub łączenie, ograniczanie, usuwanie lub niszczenie;
            </li>
            <li>
              <strong>Ograniczenie przetwarzania</strong> - oznacza oznaczenie
              przechowywanych danych osobowych w celu ograniczenia ich
              przyszłego przetwarzania
            </li>
            <li>
              <strong>Profilowanie</strong> - oznacza dowolną formę
              zautomatyzowanego przetwarzania danych osobowych, które polega na
              wykorzystaniu danych osobowych do oceny niektórych czynników
              osobowych osoby fizycznej, w szczególności do analizy lub prognozy
              aspektów dotyczących efektów pracy tej osoby fizycznej, jej
              sytuacji ekonomicznej, zdrowia, osobistych preferencji,
              zainteresowań, wiarygodności, zachowania, lokalizacji lub
              przemieszczania się
            </li>
            <li>
              <strong>Zgoda</strong> - zgoda osoby, której dane dotyczą oznacza
              dobrowolne, konkretne, świadome i jednoznaczne okazanie woli,
              którym osoba, której dane dotyczą, w formie oświadczenia lub
              wyraźnego działania potwierdzającego, przyzwala na przetwarzanie
              dotyczących jej danych osobowych
            </li>
            <li>
              <strong>Naruszenie ochrony danych osobowych</strong> - oznacza
              naruszenie bezpieczeństwa prowadzące do przypadkowego lub
              niezgodnego z prawem zniszczenia, utracenia, zmodyfikowania,
              nieuprawnionego ujawnienia lub nieuprawnionego dostępu do danych
              osobowych przesyłanych, przechowywanych lub w inny sposób
              przetwarzanych
            </li>
            <li>
              <strong>Pseudonimizacja</strong> - oznacza przetworzenie danych
              osobowych w taki sposób, by nie można ich było już przypisać
              konkretnej osobie, której dane dotyczą, bez użycia dodatkowych
              informacji, pod warunkiem że takie dodatkowe informacje są
              przechowywane osobno i są objęte środkami technicznymi i
              organizacyjnymi uniemożliwiającymi ich przypisanie
              zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej
            </li>
            <li>
              <strong>Anonimizacja</strong> - Anonimizacja danych to
              nieodwracalny proces operacji na danych, który niszczy / nadpisuje
              &quot;dane osobowe&quot; uniemożliwiając identyfikację, lub
              powiązanie danego rekordu z konkretnym użytkownikiem lub osobą
              fizyczną.
            </li>
          </ul>
        </Section>

        <Section title="§2 Inspektor Ochrony Danych">
          <p>
            Administrator wyznaczył Inspektora Ochrony Danych osobowych – Kamila
            Kołodziejczaka, z którym można się skontaktować pod adresem:
            iod@zhr.pl
          </p>
          <p>
            W sprawach dotyczących przetwarzania danych, w tym danych osobowych,
            należy kontaktować się z Inspektorem Ochrony Danych.
          </p>
        </Section>

        <Section title="§3 Rodzaje Plików Cookies">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Cookies wewnętrzne</strong> - pliki zamieszczane i
              odczytywane z Urządzenia Użytkownika przez system
              teleinformatyczny Serwisu
            </li>
            <li>
              <strong>Cookies zewnętrzne</strong> - pliki zamieszczane i
              odczytywane z Urządzenia Użytkownika przez systemy
              teleinformatyczne Serwisów zewnętrznych, których operatorzy są
              wymienieni w dalszej części. Skrypty Serwisów zewnętrznych, które
              mogą umieszczać pliki Cookies na Urządzeniach Użytkownika, zostały
              świadomie umieszczone w Serwisie poprzez skrypty i usługi
              udostępnione i zainstalowane w Serwisie
            </li>
            <li>
              <strong>Cookies sesyjne</strong> - pliki zamieszczane i
              odczytywane z Urządzenia Użytkownika przez Serwis podczas jednej
              sesji danego Urządzenia. Po zakończeniu sesji pliki są usuwane z
              Urządzenia Użytkownika.
            </li>
            <li>
              <strong>Cookies trwałe</strong> - pliki zamieszczane i odczytywane
              z Urządzenia Użytkownika przez Serwis do momentu ich ręcznego
              usunięcia. Pliki nie są usuwane automatycznie po zakończeniu sesji
              Urządzenia, chyba że konfiguracja Urządzenia Użytkownika jest
              ustawiona na tryb usuwanie plików Cookie po zakończeniu sesji
              Urządzenia.
            </li>
          </ul>
        </Section>

        <Section title="§4 Bezpieczeństwo składowania danych">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Mechanizmy składowania i odczytu plików Cookie</strong> -
              Mechanizmy składowania, odczytu i wymiany danych pomiędzy Plikami
              Cookies zapisywanymi na Urządzeniu Użytkownika a Serwisem są
              realizowane poprzez wbudowane mechanizmy przeglądarek
              internetowych i nie pozwalają na pobieranie innych danych z
              Urządzenia Użytkownika lub danych innych witryn internetowych,
              które odwiedzał Użytkownik, w tym danych osobowych ani informacji
              poufnych. Przeniesienie na Urządzenie Użytkownika wirusów, koni
              trojańskich oraz innych robaków jest także praktycznie niemożliwe.
            </li>
            <li>
              <strong>Cookie wewnętrzne</strong> - zastosowane przez
              Administratora pliki Cookie są bezpieczne dla Urządzeń
              Użytkowników i nie zawierają skryptów, treści lub informacji
              mogących zagrażać bezpieczeństwu danych osobowych lub
              bezpieczeństwu Urządzenia z którego korzysta Użytkownik.
            </li>
            <li>
              <strong>Cookie zewnętrzne</strong> - Administrator dokonuje
              wszelkich możliwych działań w celu weryfikacji i doboru partnerów
              serwisu w kontekście bezpieczeństwa Użytkowników. Administrator do
              współpracy dobiera znanych, dużych partnerów o globalnym zaufaniu
              społecznym. Nie posiada on jednak pełnej kontroli nad zawartością
              plików Cookie pochodzących od zewnętrznych partnerów. Za
              bezpieczeństwo plików Cookie, ich zawartość oraz zgodne z licencją
              wykorzystanie przez zainstalowane w serwisie Skrypty, pochodzących
              z Serwisów zewnętrznych, Administrator nie ponosi
              odpowiedzialności na tyle na ile pozwala na to prawo. Lista
              partnerów zamieszczona jest w dalszej części Polityki Prywatności.
            </li>
            <li>
              <strong>Kontrola plików Cookie</strong>
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  Użytkownik może w dowolnym momencie, samodzielnie zmienić
                  ustawienia dotyczące zapisywania, usuwania oraz dostępu do
                  danych zapisanych plików Cookies przy użyciu menu znajdującego
                  się w lewym dolnym rogu ekranu.
                </li>
                <li>
                  Do czasu zaakceptowania korzystania z plików cookies witryna
                  zapisuje tylko i wyłącznie niezbędne do jej działania pliki
                  cookies.
                </li>
              </ul>
            </li>
            <li>
              <strong>Zagrożenia po stronie Użytkownika</strong> - Administrator
              stosuje wszelkie możliwe środki techniczne w celu zapewnienia
              bezpieczeństwa danych umieszczanych w plikach Cookie. Należy
              jednak zwrócić uwagę, że zapewnienie bezpieczeństwa tych danych
              zależy od obu stron w tym działalności Użytkownika. Administrator
              nie bierze odpowiedzialności za przechwycenie tych danych,
              podszycie się pod sesję Użytkownika lub ich usunięcie, na skutek
              świadomej lub nieświadomej działalność Użytkownika, wirusów, koni
              trojańskich i innego oprogramowania szpiegującego, którymi może
              jest lub było zainfekowane Urządzenie Użytkownika. Użytkownicy w
              celu zabezpieczenia się przed tymi zagrożeniami powinni stosować
              się do zasad zwiększających ich{" "}
              <a
                rel="external"
                href="https://nety.pl/cyberbezpieczenstwo/"
                className="text-[#1abc9c] hover:underline"
              >
                cyberbezpieczeństwo
              </a>
              .
            </li>
            <li>
              <strong>Przechowywanie danych osobowych</strong> - Administrator
              zapewnia, że dokonuje wszelkich starań, by przetwarzane dane
              osobowe wprowadzone dobrowolnie przez Użytkowników były
              bezpieczne, dostęp do nich był ograniczony i realizowany zgodnie z
              ich przeznaczeniem i celami przetwarzania. Administrator zapewnia
              także, że dokonuje wszelkich starań w celu zabezpieczenia
              posiadanych danych przed ich utratą, poprzez stosowanie
              odpowiednich zabezpieczeń fizycznych jak i organizacyjnych.
            </li>
            <li>
              <strong>Przechowywanie haseł</strong> - Administrator oświadcza,
              że hasła przechowywane są w zaszyfrowanej postaci, używając
              najnowszych standardów i wytycznych w tym zakresie. Deszyfracja
              podawanych w Serwisie haseł dostępu do konta jest praktycznie
              niemożliwa.
            </li>
          </ul>
        </Section>

        <Section title="§5 Cele do których wykorzystywane są pliki Cookie">
          <ul className="list-inside list-disc space-y-2">
            <li>Usprawnienie i ułatwienie dostępu do Serwisu</li>
            <li>Personalizacja Serwisu dla Użytkowników</li>
            <li>Umożliwienie Logowania do serwisu</li>
            <li>Usługi serwowania reklam</li>
            <li>
              Prowadzenie statystyk (użytkowników, ilości odwiedzin, rodzajów
              urządzeń, łącze itp.)
            </li>
            <li>Świadczenie usług społecznościowych</li>
          </ul>
        </Section>

        <Section title="§6 Cele przetwarzania danych osobowych">
          <p>
            Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane w
            jednym z następujących celów:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Realizacji usług elektronicznych:
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  Usługi rejestracji i utrzymania konta Użytkownika w Serwisie i
                  funkcjonalności z nim związanych
                </li>
              </ul>
            </li>
            <li>
              Komunikacji Administratora z Użytkownikami w sprawach związanych z
              Serwisem oraz ochrony danych
            </li>
            <li>Zapewnienia prawnie uzasadnionego interesu Administratora</li>
          </ul>
          <p>
            Dane o Użytkownikach gromadzone anonimowo i automatycznie są
            przetwarzane w jednym z następujących celów:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Prowadzenie statystyk</li>
            <li>Serwowanie reklam dostosowanych do preferencji Użytkowników</li>
            <li>Zapewnienia prawnie uzasadnionego interesu Administratora</li>
          </ul>
        </Section>

        <Section title="§7 Pliki Cookies Serwisów zewnętrznych">
          <p>
            Administrator w Serwisie wykorzystuje skrypty javascript i
            komponenty webowe partnerów, którzy mogą umieszczać własne pliki
            cookies na Urządzeniu Użytkownika. Pamiętaj, że w ustawieniach
            swojej przeglądarki możesz sam decydować o dozwolonych plikach
            cookies jakie mogą być używane przez poszczególne witryny
            internetowe. Poniżej znajduje się lista partnerów lub ich usług
            zaimplementowanych w Serwisie, mogących umieszczać pliki
            cookies:{" "}
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Usługi społecznościowe / łączone:</strong>
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  <a
                    rel="nofollow external"
                    href="https://policies.google.com/privacy?hl=pl"
                    className="text-[#1abc9c] hover:underline"
                  >
                    Google
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <strong>Usługi serwowania reklam oraz sieci afiliacyjne:</strong>
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  <a
                    rel="nofollow external"
                    href="https://policies.google.com/privacy?hl=pl"
                    className="text-[#1abc9c] hover:underline"
                  >
                    Google Adsense
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <strong>Prowadzenie statystyk:</strong>
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  <a
                    rel="nofollow external"
                    href="https://policies.google.com/privacy?hl=pl"
                    className="text-[#1abc9c] hover:underline"
                  >
                    Google Analytics
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <p>
            Usługi świadczone przez podmioty trzecie są poza kontrolą
            Administratora. Podmioty te mogą w każdej chwili zmienić swoje
            warunki świadczenia usług, polityki prywatności, cel przetwarzania
            danych oraz sposób wykorzystywania plików cookie.
          </p>
        </Section>

        <Section title="§8 Rodzaje gromadzonych danych">
          <p>
            Serwis gromadzi dane o Użytkownikach. Cześć danych jest gromadzona
            automatycznie i anonimowo, a część danych to dane osobowe podane
            dobrowolnie przez Użytkowników w trakcie zapisywania się do
            poszczególnych usług oferowanych przez Serwis.
          </p>
          <p>
            <strong>
              Anonimowe dane gromadzone automatycznie na podstawie Google
              Analytics:
            </strong>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Adres IP</li>
            <li>Typ przeglądarki</li>
            <li>Rozdzielczość ekranu</li>
            <li>Przybliżona lokalizacja</li>
            <li>Otwierane podstrony serwisu</li>
            <li>Czas spędzony na odpowiedniej podstronie serwisu</li>
            <li>Rodzaj systemu operacyjnego</li>
            <li>Adres poprzedniej podstrony</li>
            <li>Adres strony odsyłającej</li>
            <li>Język przeglądarki</li>
            <li>Prędkość łącza internetowego</li>
            <li>Dostawca usług internetowych</li>
            <li>Anonimowe dane demograficzne (wiek, płeć, zainteresowania)</li>
          </ul>
          <p>
            <strong>Dane gromadzone podczas rejestracji:</strong>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Imię / nazwisko / pseudonim</li>
            <li>Adres e-mail</li>
            <li>
              Informacje o tobie w Zwiazku Harcerstwa Rzeczypospolitej (stopień,
              funkcja, drużyna, zastęp oraz twoje próby)
            </li>
            <li>Adres IP (zbierane automatycznie)</li>
          </ul>
          <p>
            <strong>Dane gromadzone podczas zapisu do usługi Newsletter</strong>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Adres e-mail</li>
          </ul>
          <p>
            Część danych (bez danych identyfikujących) może być przechowywana w
            plikach cookies. Cześć danych (bez danych identyfikujących) może być
            przekazywana do dostawcy usług statystycznych.
          </p>
        </Section>

        <Section title="§9 Dostęp do danych osobowych przez podmioty trzecie">
          <p>
            Co do zasady jedynym odbiorcą danych osobowych podawanych przez
            Użytkowników jest Administrator. Dane gromadzone w ramach
            świadczonych usług nie są przekazywane ani odsprzedawane podmiotom
            trzecim.
          </p>
          <p>
            Dostęp do danych (najczęściej na podstawie Umowy powierzenia
            przetwarzania danych) mogą posiadać podmioty, odpowiedzialne za
            utrzymania infrastruktury i usług niezbędnych do prowadzenia serwisu
            tj.:
          </p>
          <ul className="list-inside list-disc space-y-2"></ul>
        </Section>

        <Section title="§10 Sposób przetwarzania danych osobowych">
          <p>
            <strong>Dane osobowe podane dobrowolnie przez Użytkowników:</strong>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Dane osobowe nie będą przekazywane poza Unię Europejską, chyba że
              zostały opublikowane na skutek indywidualnego działania
              Użytkownika (np. wprowadzenie komentarza lub wpisu), co sprawi, że
              dane będą dostępne dla każdej osoby odwiedzającej serwis.
            </li>
            <li>
              Dane osobowe nie będą wykorzystywane do zautomatyzowanego
              podejmowania decyzji (profilowania).
            </li>
            <li>Dane osobowe nie będą odsprzedawane podmiotom trzecim.</li>
          </ul>
          <p>
            <strong>
              Dane anonimowe (bez danych osobowych) gromadzone automatycznie:
            </strong>
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Dane anonimowe (bez danych osobowych) będą przekazywane poza Unię
              Europejską.
            </li>
            <li>
              Dane anonimowe (bez danych osobowych) mogą być wykorzystywane do
              zautomatyzowanego podejmowania decyzji (profilowania).
              <br />
              Profilowanie danych anonimowych (bez danych osobowych) nie
              wywołuje skutków prawnych lub w podobny sposób istotnie nie wpływa
              na osobę, której dane podlegają automatycznemu podejmowaniu
              decyzji.
            </li>
            <li>
              Dane anonimowe (bez danych osobowych) nie będą odsprzedawane
              podmiotom trzecim.
            </li>
          </ul>
        </Section>

        <Section title="§11 Podstawy prawne przetwarzania danych osobowych">
          <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
              dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
              związku z przetwarzaniem danych osobowych i w sprawie swobodnego
              przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
              rozporządzenie o ochronie danych)
              <ul className="ml-6 list-inside list-disc space-y-2">
                <li>
                  art. 6 ust. 1 lit. a<br />
                  <small>
                    osoba, której dane dotyczą wyraziła zgodę na przetwarzanie
                    swoich danych osobowych w jednym lub większej liczbie
                    określonych celów
                  </small>
                </li>
                <li>
                  art. 6 ust. 1 lit. b<br />
                  <small>
                    przetwarzanie jest niezbędne do wykonania umowy na
                    świadczenie usług drogą elektroniczną, której stroną jest
                    osoba, której dane dotyczą, lub do podjęcia działań na
                    żądanie osoby, której dane dotyczą, przed zawarciem umowy
                  </small>
                </li>
                <li>
                  art. 6 ust. 1 lit. f<br />
                  <small>
                    przetwarzanie jest niezbędne do celów wynikających z prawnie
                    uzasadnionych interesów realizowanych przez administratora
                    lub przez stronę trzecią
                  </small>
                </li>
              </ul>
            </li>
            <li>
              Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U.
              2018 poz. 1000)
            </li>
            <li>
              Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004
              nr 171 poz. 1800)
            </li>
            <li>
              Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach
              pokrewnych (Dz. U. 1994 Nr 24 poz. 83)
            </li>
          </ul>
        </Section>

        <Section title="§12 Okres przetwarzania danych osobowych">
          <p>
            <strong>Dane osobowe podane dobrowolnie przez Użytkowników:</strong>
          </p>
          <p>
            Co do zasady wskazane dane osobowe są przechowywane wyłącznie przez
            okres świadczenia Usługi w ramach Serwisu przez Administratora. Są
            one usuwane lub anonimizowane w okresie do 30 dni od chwili
            zakończenia świadczenia usług (np. usunięcie zarejestrowanego konta
            użytkownika, wypisanie z listy Newsletter, itp.)
          </p>
          <p>
            Wyjątek stanowi sytuacja, która wymaga zabezpieczenia prawnie
            uzasadnionych celów dalszego przetwarzania tych danych przez
            Administratora. W takiej sytuacji Administrator będzie przechowywał
            wskazane dane, od czasu żądania ich usunięcia przez Użytkownika, nie
            dłużej niż przez okres 3 lat w przypadku naruszenia lub podejrzenia
            naruszenia zapisów regulaminu serwisu przez Użytkownika
          </p>
          <p>
            <strong>
              Dane anonimowe (bez danych osobowych) gromadzone automatycznie:
            </strong>
          </p>
          <p>
            Anonimowe dane statystyczne, niestanowiące danych osobowych, są
            przechowywane przez Administratora w celu prowadzenia statystyk
            serwisu przez czas nieoznaczony
          </p>
        </Section>

        <Section title="§13 Prawa Użytkowników związane z przetwarzaniem danych osobowych">
          <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Prawo dostępu do danych osobowych</strong>
              <br />
              Użytkownikom przysługuje prawo uzyskania dostępu do swoich danych
              osobowych, realizowane za pośrednictwem panelu użytkownika
              dostępnego po zalogowaniu i narzędzi umożliwiających dostęp do
              konta w przypadku zapomnianego hasła.
            </li>
            <li>
              <strong>Prawo do sprostowania danych osobowych</strong>
              <br />
              Użytkownikom przysługuje prawo żądania od Administratora
              niezwłocznego sprostowania danych osobowych, które są
              nieprawidłowe lub / oraz uzupełnienia niekompletnych danych
              osobowych, realizowane za pośrednictwem panelu użytkownika
              dostępnego po zalogowaniu i narzędzi umożliwiających dostęp do
              konta w przypadku zapomnianego hasła.
            </li>
            <li>
              <strong>Prawo do usunięcia danych osobowych</strong>
              <br />
              Użytkownikom przysługuje prawo żądania od Administratora
              niezwłocznego usunięcia danych osobowych, realizowane na żądanie
              złożone do AdministratoraW przypadku kont użytkowników, usunięcie
              danych polega na anonimizacji danych umożliwiających identyfikację
              Użytkownika. Administrator zastrzega sobie prawo wstrzymania
              realizacji żądania usunięcia danych w celu ochrony prawnie
              uzasadnionego interesu Administratora (np. w gdy Użytkownik
              dopuścił się naruszenia Regulaminu czy dane zostały pozyskane
              wskutek prowadzonej korespondencji).
              <br />W przypadku usługi Newsletter, Użytkownik ma możliwość
              samodzielnego usunięcia swoich danych osobowych korzystając z
              odnośnika umieszczonego w każdej przesyłanej wiadomości e-mail.
            </li>
            <li>
              <strong>
                Prawo do ograniczenia przetwarzania danych osobowych
              </strong>
              <br />
              Użytkownikom przysługuje prawo ograniczenia przetwarzania danych
              osobowych w przypadkach wskazanych w art. 18 RODO, m.in.
              kwestionowania prawidłowość danych osobowych, realizowane na
              żądanie złożone do Administratora
            </li>
            <li>
              <strong>Prawo do przenoszenia danych osobowych</strong>
              <br />
              Użytkownikom przysługuje prawo uzyskania od Administratora, danych
              osobowych dotyczących Użytkownika w ustrukturyzowanym, powszechnie
              używanym formacie nadającym się do odczytu maszynowego,
              realizowane na żądanie złożone do Administratora
            </li>
            <li>
              <strong>
                Prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych
              </strong>
              <br />
              Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec
              przetwarzania jego danych osobowych w przypadkach określonych w
              art. 21 RODO, realizowane na żądanie złożone do Administratora
            </li>
            <li>
              <strong>Prawo wniesienia skargi</strong>
              <br />
              Użytkownikom przysługuje prawo wniesienia skargi do organu
              nadzorczego zajmującego się ochroną danych osobowych.
            </li>
          </ul>
        </Section>

        <Section title="§14 Kontakt do Administratora">
          <p>
            Z Administratorem można skontaktować się w jeden z poniższych
            sposobów
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>
                Adres poczty elektronicznej Inspektora Ochrony Danych
              </strong>
              :{" "}
              <a
                href="mailto:iod@zhr.pl"
                target="_blank"
                className="text-[#1abc9c] hover:underline"
              >
                iod@zhr.pl
              </a>
            </li>
            <li>
              <strong>Adres poczty elektronicznej Administratora</strong>:{" "}
              <a
                href="mailto:eproba@zhr.pl"
                target="_blank"
                className="text-[#1abc9c] hover:underline"
              >
                eproba@zhr.pl
              </a>
            </li>
            <li>
              <strong>Adres korespondencyjny</strong>: Związek Harcerstwa
              Rzeczypospolitej, ul. Litewska 11/13, 00-589 Warszawa
            </li>
            <li>
              <strong>Formularz kontaktowy</strong> - dostępny pod adresem:{" "}
              <Link
                href="https://eproba.zhr.pl/contact"
                className="text-[#1abc9c] hover:underline"
              >
                eproba.zhr.pl/contact
              </Link>
            </li>
          </ul>
        </Section>

        <Section title="§15 Wymagania Serwisu">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu
              Użytkownika może spowodować nieprawidłowe działanie niektórych
              funkcji Serwisu.
            </li>
            <li>
              Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo
              działające funkcje Serwisu w przypadku gdy Użytkownik ograniczy w
              jakikolwiek sposób możliwość zapisywania i odczytu plików Cookie.
            </li>
          </ul>
        </Section>

        <Section title="§16 Linki zewnętrzne">
          <p>
            W Serwisie - artykułach, postach, wpisach czy komentarzach
            Użytkowników mogą znajdować się odnośniki do witryn zewnętrznych, z
            którymi Właściciel serwisu nie współpracuje. Linki te oraz strony
            lub pliki pod nimi wskazane mogą być niebezpieczne dla Twojego
            Urządzenia lub stanowić zagrożenie bezpieczeństwa Twoich danych.
            Administrator nie ponosi odpowiedzialności za zawartość znajdującą
            się poza Serwisem.
          </p>
        </Section>

        <Section title="§17 Zmiany w Polityce Prywatności">
          <ul className="list-inside list-disc space-y-2">
            <li>
              Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej
              Polityki Prywatności bez konieczności informowania o tym
              Użytkowników w zakresie stosowania i wykorzystywania danych
              anonimowych lub stosowania plików Cookie.
            </li>
            <li>
              Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej
              Polityki Prywatności w zakresie przetwarzania Danych Osobowych, o
              czym poinformuje Użytkowników posiadających konta użytkownika lub
              zapisanych do usługi newsletter, za pośrednictwem poczty
              elektronicznej w terminie do 7 dni od zmiany zapisów. Dalsze
              korzystanie z usług oznacza zapoznanie się i akceptację
              wprowadzonych zmian Polityki Prywatności. W przypadku w którym
              Użytkownik nie będzie się zgadzał z wprowadzonymi zmianami, ma
              obowiązek usunąć swoje konto z Serwisu lub wypisać się z usługi
              Newsletter.
            </li>
            <li>
              Wprowadzone zmiany w Polityce Prywatności będą publikowane na tej
              podstronie Serwisu.
            </li>
            <li>Wprowadzone zmiany wchodzą w życie z chwilą ich publikacji.</li>
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
