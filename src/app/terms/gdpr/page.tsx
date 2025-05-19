import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function GDPRPage() {
  return (
    <Card>
      <CardContent>
        <h1 className="text-center text-4xl mb-4">
          Obowiązek informacyjny RODO
        </h1>
        <p>
          Poniższa informacja stanowi zwięzły, zrozumiały i przejrzysty skrót
          informacji zamieszczonych w
          <Link href="/terms/privacy-policy"> Polityce Prywatności</Link>{" "}
          odnośnie Administratora danych, celu i sposobu przetwarzania danych
          osobowych oraz Twoich praw w związku z tym przetwarzaniem, w formie
          wymaganej do spełnienia obowiązku informacyjnego RODO. Szczegóły
          dotyczące sposobu przetwarzania i podmiotów uczestniczących w tym
          procesie dostępne są we wskazanej polityce.
        </p>

        <ul className="space-y-4">
          <li>
            <span className="text-2xl">Kto jest administratorem danych?</span>
            <p>
              Administratorem Danych Osobowych (dalej Administrator) jest
              Związek Harcerstwa Rzeczypospolitej z siedzibą w Warszawie
              (00-589) przy ul. Litewskiej 11/13., świadczący usługi drogą
              elektroniczną za pośrednictwem Serwisu.
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Jak można skontaktować się z administratorem danych?
            </span>
            <p>
              Z Administratorem można skontaktować się w jeden z poniższych
              sposobów:
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>
                  Adres poczty elektronicznej Inspektora Ochrony Danych
                </strong>
                : iod@zhr.pl
              </li>
              <li>
                <strong>Adres korespondencyjny</strong>: Związek Harcerstwa
                Rzeczypospolitej, ul. Litewska 11/13, 00-589 Warszawa
              </li>
              <li>
                <strong>Formularz kontaktowy</strong> - dostępny pod adresem:
                eproba.zhr.pl/contact/
              </li>
            </ul>
          </li>
          <li>
            <span className="text-2xl">
              Czy Administrator powołał Inspektora Danych Osobowych?
            </span>
            <p>
              Administrator wyznaczył Inspektora Ochrony Danych – Kamila
              Kołodziejczaka
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Jak można skontaktować się z Inspektorem Danych Osobowych?
            </span>
            <p>Kontakt z Inspektorem Danych Osobowych możliwy jest poprzez:</p>
            <ul>
              <li>
                <strong>Adres e-mail</strong>: iod@zhr.pl
              </li>
            </ul>
            <p>
              W sprawach dotyczących przetwarzania danych, w tym danych
              osobowych, należy kontaktować się bezpośrednio z Inspektorem
              Ochrony Danych lub Administratorem.
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Skąd pozyskujemy dane osobowe i jakie są ich źródła?
            </span>
            <p>Dane pozyskiwane są z następujących źródeł:</p>
            <ul>
              <li>Od osób, których dane dotyczą</li>
              <li>
                W przypadku rejestracji przy użyciu portali społecznościowych,
                za wyrażoną świadomą zgodą tych osób, z tych portali
                społecznościowych
              </li>
            </ul>
          </li>
          <li>
            <span className="text-2xl">
              Jaki jest zakres przetwarzanych przez nas danych osobowych?
            </span>
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
              Szczegółowy zakres przetwarzanych danych dostępny jest w
              <Link href="/terms/privacy-policy">Polityce Prywatności</Link>.
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Jakie są cele przetwarzania przez nas danych?
            </span>
            <p>
              Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane
              w jednym z następujących celów:
            </p>
            <ul>
              <li>
                Realizacji usług elektronicznych:
                <ul>
                  <li>
                    Usługi rejestracji i utrzymania konta Użytkownika w Serwisie
                    i funkcjonalności z nim związanych
                  </li>
                </ul>
              </li>
              <li>
                Komunikacji Administratora z Użytkownikami w sprawach związanych
                z Serwisem oraz ochroną danych
              </li>
              <li>Zapewnienia prawnie uzasadnionego interesu Administratora</li>
            </ul>
          </li>
          <li>
            <span className="text-2xl">
              Jakie są podstawy prawne przetwarzania danych?
            </span>
            <p>Serwis gromadzi i przetwarza dane Użytkowników na podstawie:</p>
            <ul>
              <li>
                Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z
                dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w
                związku z przetwarzaniem danych osobowych i w sprawie swobodnego
                przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
                (ogólne rozporządzenie o ochronie danych)
                <ul>
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
                      przetwarzanie jest niezbędne do wykonania umowy, której
                      stroną jest osoba, której dane dotyczą, lub do podjęcia
                      działań na żądanie osoby, której dane dotyczą, przed
                      zawarciem umowy
                    </small>
                  </li>
                  <li>
                    art. 6 ust. 1 lit. f<br />
                    <small>
                      przetwarzanie jest niezbędne do celów wynikających z
                      prawnie uzasadnionych interesów realizowanych przez
                      administratora lub przez stronę trzecią
                    </small>
                  </li>
                </ul>
              </li>
              <li>
                Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U.
                2018 poz. 1000)
              </li>
              <li>
                Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U.
                2004 nr 171 poz. 1800)
              </li>
              <li>
                Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach
                pokrewnych (Dz. U. 1994 Nr 24 poz. 83)
              </li>
            </ul>
          </li>
          <li>
            <span className="text-2xl">
              Jaki jest prawnie uzasadniony interes realizowany przez
              Administratora?
            </span>
            <ul>
              <li>
                W celu ewentualnego ustalenia, dochodzenia lub obrony przed
                roszczeniami – podstawą prawną przetwarzania jest nasz
                uzasadniony interes (art. 6 ust. 1 lit. f) RODO) polegający na
                ochronie naszych praw, w tym między innymi;
              </li>
              <li>W celu oceny ryzyka potencjalnych klientów</li>
              <li>W celu oceny planowanych kampanii marketingowych</li>
              <li>W celu realizacji marketingu bezpośredniego</li>
            </ul>
          </li>
          <li>
            <span className="text-2xl">
              Przez jaki okres przetwarzamy dane osobowe?
            </span>
            <p>
              Co do zasady, wskazane dane osobowe są przechowywane wyłącznie
              przez okres świadczenia usługi w ramach prowadzonego serwisu przez
              Administratora. Są one usuwane lub anonimizowane w okresie do
              <strong>
                30 dni od chwili zakończenia świadczenia usług
              </strong>{" "}
              (np. usunięcie zarejestrowanego konta użytkownika, wypisanie z
              listy Newsletter, itp.)
            </p>
            <p>
              W wyjątkowych sytuacjach, w celu zabezpieczenie prawnie
              uzasadnionego interesu realizowanego przez Administratora, okres
              ten może ulec wydłużeniu. W takiej sytuacji Administrator będzie
              przechowywał wskazane dane, od czasu żądania ich usunięcia przez
              Użytkownika, nie dłużej niż przez okres 3 lat w przypadku
              naruszenia lub podejrzenia naruszenia zapisów regulaminu serwisu
              przez osobę, której dane dotyczą.
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Kto jest odbiorcą danych w tym danych osobowych?
            </span>
            <p>Co do zasady jedynym odbiorcą danych jest Administrator.</p>
            <p>
              Przetwarzanie danych może jednak być powierzone innym podmiotom,
              realizującym usługi na rzecz Administratora w celu utrzymania
              działalności Serwisu.
            </p>
            <p>Do podmiotów takich można zaliczyć między innymi:</p>
            <ul></ul>
          </li>
          <li>
            <span className="text-2xl">
              Czy Państwa dane osobowe będą przekazywane poza Unię Europejską?
            </span>
            <p>
              Dane osobowe{" "}
              <strong>nie będą przekazywane poza Unię Europejską</strong>, chyba
              że zostały opublikowane na skutek indywidualnego działania
              Użytkownika (np. wprowadzenie komentarza lub wpisu), co sprawi, że
              dane będą dostępne dla każdej osoby odwiedzającej serwis.
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Czy dane osobowe będą podstawą zautomatyzowanego podejmowania
              decyzji?
            </span>
            <p>
              Dane osobowe <strong>nie będą wykorzystywane</strong> do
              zautomatyzowanego podejmowania decyzji (profilowania).
            </p>
          </li>
          <li>
            <span className="text-2xl">
              Jakie mają Państwo prawa związane z przetwarzaniem danych
              osobowych?
            </span>
            <ul>
              <li>
                <p>
                  <strong>Prawo dostępu do danych osobowych</strong>
                  <br />
                  Użytkownikom przysługuje prawo uzyskania dostępu do swoich
                  danych osobowych, realizowane za pośrednictwem panelu
                  użytkownika dostępnego po zalogowaniu i narzędzi
                  umożliwiających dostęp do konta w przypadku zapomnianego
                  hasła.
                </p>
              </li>
              <li>
                <p>
                  <strong>Prawo do sprostowania danych osobowych</strong>
                  <br />
                  Użytkownikom przysługuje prawo żądania od Administratora
                  niezwłocznego sprostowania danych osobowych, które są
                  nieprawidłowe lub / oraz uzupełnienia niekompletnych danych
                  osobowych, realizowane za pośrednictwem panelu użytkownika
                  dostępnego po zalogowaniu i narzędzi umożliwiających dostęp do
                  konta w przypadku zapomnianego hasła.
                </p>
              </li>
              <li>
                <p>
                  <strong>Prawo do usunięcia danych osobowych</strong>
                  <br />
                  Użytkownikom przysługuje prawo żądania od Administratora
                  niezwłocznego usunięcia danych osobowych, realizowane na
                  żądanie złożone do Administratora. <br />
                  <br />W przypadku kont użytkowników, usunięcie danych polega
                  na anonimizacji danych umożliwiających identyfikację
                  Użytkownika.
                  <br />
                  <br />W przypadku usługi Newsletter, Użytkownik ma możliwość
                  samodzielnego usunięcia swoich danych osobowych korzystając z
                  odnośnika umieszczonego w każdej przesyłanej wiadomości
                  e-mail.
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Prawo do ograniczenia przetwarzania danych osobowych
                  </strong>
                  <br />
                  Użytkownikom przysługuje prawo ograniczenia przetwarzania
                  danych osobowych w przypadkach wskazanych w art. 18 RODO,
                  m.in. kwestionowania prawidłowość danych osobowych,
                  realizowane na żądanie złożone do Administratora
                </p>
              </li>
              <li>
                <p>
                  <strong>Prawo do przenoszenia danych osobowych</strong>
                  <br />
                  Użytkownikom przysługuje prawo uzyskania od Administratora,
                  danych osobowych dotyczących Użytkownika w ustrukturyzowanym,
                  powszechnie używanym formacie nadającym się do odczytu
                  maszynowego, realizowane na żądanie złożone do Administratora
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Prawo wniesienia sprzeciwu wobec przetwarzania danych
                    osobowych
                  </strong>
                  <br />
                  Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec
                  przetwarzania jego danych osobowych w przypadkach określonych
                  w art. 21 RODO, realizowane na żądanie złożone do
                  Administratora
                </p>
              </li>
              <li>
                <p>
                  <strong>Prawo wniesienia skargi</strong>
                  <br />
                  Użytkownikom przysługuje prawo wniesienia skargi do organu
                  nadzorczego zajmującego się ochroną danych osobowych.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
