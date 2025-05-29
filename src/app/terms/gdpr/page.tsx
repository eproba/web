import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function GDPRPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Obowiązek informacyjny RODO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          Poniższa informacja stanowi zwięzły, zrozumiały i przejrzysty skrót
          informacji zamieszczonych w{" "}
          <Link
            href="/terms/privacy-policy"
            className="text-[#1abc9c] hover:underline"
          >
            Polityce Prywatności
          </Link>{" "}
          odnośnie Administratora danych, celu i sposobu przetwarzania danych
          osobowych oraz Twoich praw w związku z tym przetwarzaniem, w formie
          wymaganej do spełnienia obowiązku informacyjnego RODO. Szczegóły
          dotyczące sposobu przetwarzania i podmiotów uczestniczących w tym
          procesie dostępne są we wskazanej polityce.
        </p>

        <Section title="Kto jest administratorem danych?">
          <p>
            Administratorem Danych Osobowych (dalej Administrator) jest Związek
            Harcerstwa Rzeczypospolitej z siedzibą w Warszawie (00-589) przy ul.
            Litewskiej 11/13., świadczący usługi drogą elektroniczną za
            pośrednictwem Serwisu.
          </p>
        </Section>

        <Section title="Jak można skontaktować się z administratorem danych?">
          <p>
            Z Administratorem można skontaktować się w jeden z poniższych
            sposobów:
          </p>
          <ul className="list-disc list-inside space-y-2">
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

        <Section title="Czy Administrator powołał Inspektora Danych Osobowych?">
          <p>
            Administrator wyznaczył Inspektora Ochrony Danych – Kamila
            Kołodziejczaka
          </p>
        </Section>

        <Section title="Jak można skontaktować się z Inspektorem Danych Osobowych?">
          <p>Kontakt z Inspektorem Danych Osobowych możliwy jest poprzez:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Adres e-mail</strong>: iod@zhr.pl
            </li>
          </ul>
          <p>
            W sprawach dotyczących przetwarzania danych, w tym danych osobowych,
            należy kontaktować się bezpośrednio z Inspektorem Ochrony Danych lub
            Administratorem.
          </p>
        </Section>

        <Section title="Skąd pozyskujemy dane osobowe i jakie są ich źródła?">
          <p>Dane pozyskiwane są z następujących źródeł:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Od osób, których dane dotyczą</li>
            <li>
              W przypadku rejestracji przy użyciu portali społecznościowych, za
              wyrażoną świadomą zgodą tych osób, z tych portali
              społecznościowych
            </li>
          </ul>
        </Section>

        <Section title="Jaki jest zakres przetwarzanych przez nas danych osobowych?">
          <p>
            W serwisie przetwarzane są <strong>dane osobowe zwykłe</strong>,
            podane dobrowolnie przez osoby, których dotyczą.
            <br />
            <small>
              (Np. imię i nazwisko, login, adres e-mail, telefon, adres IP,
              itp.)
            </small>
          </p>
          <p>
            Szczegółowy zakres przetwarzanych danych dostępny jest w{" "}
            <Link
              href="https://eproba.zhr.pl/privacy-policy/"
              className="text-[#1abc9c] hover:underline"
            >
              Polityce Prywatności
            </Link>
            .
          </p>
        </Section>

        <Section title="Jakie są cele przetwarzania przez nas danych?">
          <p>
            Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane w
            jednym z następujących celów:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Realizacji usług elektronicznych:
              <ul className="list-disc list-inside ml-6 space-y-2">
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
        </Section>

        <Section title="Jakie są podstawy prawne przetwarzania danych?">
          <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
              dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
              związku z przetwarzaniem danych osobowych i w sprawie swobodnego
              przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
              rozporządzenie o ochronie danych)
              <ul className="list-disc list-inside ml-6 space-y-2">
                <li>
                  art. 6 ust. 1 lit. a
                  <br />
                  <small>
                    osoba, której dane dotyczą wyraziła zgodę na przetwarzanie
                    swoich danych osobowych w jednym lub większej liczbie
                    określonych celów
                  </small>
                </li>
                <li>
                  art. 6 ust. 1 lit. b
                  <br />
                  <small>
                    przetwarzanie jest niezbędne do wykonania umowy, której
                    stroną jest osoba, której dane dotyczą, lub do podjęcia
                    działań na żądanie osoby, której dane dotyczą, przed
                    zawarciem umowy
                  </small>
                </li>
                <li>
                  art. 6 ust. 1 lit. f
                  <br />
                  <small>
                    przetwarzanie jest niezbędne do celów wynikających z prawnie
                    uzasadnionych interesów realizowanych przez administratora
                    lub przez stronę trzecią
                  </small>
                </li>
              </ul>
            </li>
            <li>Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych</li>
            <li>Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne</li>
            <li>Ustawa z dnia 4 lutego 1994 r. o prawie autorskim</li>
          </ul>
        </Section>

        <Section title="Jaki jest prawnie uzasadniony interes realizowany przez Administratora?">
          <ul className="list-disc list-inside space-y-2">
            <li>
              W celu ewentualnego ustalenia, dochodzenia lub obrony przed
              roszczeniami – podstawą prawną przetwarzania jest nasz uzasadniony
              interes (art. 6 ust. 1 lit. f) RODO) polegający na ochronie
              naszych praw, w tym między innymi;
            </li>
            <li>W celu oceny ryzyka potencjalnych klientów</li>
            <li>W celu oceny planowanych kampanii marketingowych</li>
            <li>W celu realizacji marketingu bezpośredniego</li>
          </ul>
        </Section>

        <Section title="Przez jaki okres przetwarzamy dane osobowe?">
          <p>
            Co do zasady, wskazane dane osobowe są przechowywane wyłącznie przez
            okres świadczenia usługi w ramach prowadzonego serwisu przez
            Administratora. Są one usuwane lub anonimizowane w okresie do{" "}
            <strong>30 dni od chwili zakończenia świadczenia usług</strong> (np.
            usunięcie zarejestrowanego konta użytkownika, wypisanie z listy
            Newsletter, itp.).
          </p>
          <p>
            W wyjątkowych sytuacjach, w celu zabezpieczenia prawnie
            uzasadnionego interesu realizowanego przez Administratora, okres ten
            może ulec wydłużeniu. W takiej sytuacji Administrator będzie
            przechowywał wskazane dane, od czasu żądania ich usunięcia przez
            Użytkownika, nie dłużej niż przez okres 3 lat w przypadku naruszenia
            lub podejrzenia naruszenia zapisów regulaminu serwisu przez osobę,
            której dane dotyczą.
          </p>
        </Section>

        <Section title="Kto jest odbiorcą danych w tym danych osobowych?">
          <p>Co do zasady jedynym odbiorcą danych jest Administrator.</p>
          <p>
            Przetwarzanie danych może jednak być powierzone innym podmiotom,
            realizującym usługi na rzecz Administratora w celu utrzymania
            działalności Serwisu.
          </p>
        </Section>

        <Section title="Czy Państwa dane osobowe będą przekazywane poza Unię Europejską?">
          <p>
            Dane osobowe{" "}
            <strong>nie będą przekazywane poza Unię Europejską</strong>, chyba
            że zostały opublikowane na skutek indywidualnego działania
            Użytkownika (np. wprowadzenie komentarza lub wpisu), co sprawi, że
            dane będą dostępne dla każdej osoby odwiedzającej serwis.
          </p>
        </Section>

        <Section title="Czy dane osobowe będą podstawą zautomatyzowanego podejmowania decyzji?">
          <p>
            Dane osobowe <strong>nie będą wykorzystywane</strong> do
            zautomatyzowanego podejmowania decyzji (profilowania).
          </p>
        </Section>

        <Section title="Jakie mają Państwo prawa związane z przetwarzaniem danych osobowych?">
          <ul className="list-disc list-inside space-y-2">
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
              złożone do Administratora lub przez usunięcie konta z poziomu
              profilu użytkownika.
            </li>
            <li>
              <strong>
                Prawo do ograniczenia przetwarzania danych osobowych
              </strong>
              <br />
              Użytkownikom przysługuje prawo ograniczenia przetwarzania danych
              osobowych w przypadkach wskazanych w art. 18 RODO.
            </li>
            <li>
              <strong>Prawo do przenoszenia danych osobowych</strong>
              <br />
              Użytkownikom przysługuje prawo uzyskania od Administratora danych
              osobowych w ustrukturyzowanym, powszechnie używanym formacie
              nadającym się do odczytu maszynowego.
            </li>
            <li>
              <strong>
                Prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych
              </strong>
              <br />
              Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec
              przetwarzania jego danych osobowych w przypadkach określonych w
              art. 21 RODO.
            </li>
            <li>
              <strong>Prawo wniesienia skargi</strong>
              <br />
              Użytkownikom przysługuje prawo wniesienia skargi do organu
              nadzorczego zajmującego się ochroną danych osobowych.
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
      <h2 className="text-2xl font-semibold mb-4 mt-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
