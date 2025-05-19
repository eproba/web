import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <Card>
      <CardContent>
        <h1 className="page-title text-center">Regulamin serwisu</h1>
        <h2>I. Pojęcia ogólne</h2>
        <ul>
          <li>
            <strong>Regulamin</strong> – niniejszy regulamin
          </li>
          <li>
            <strong>Serwis</strong> – serwis internetowy "Epróba" działający pod
            adresem https://eproba.zhr.pl
          </li>
          <li>
            <strong>Usługodawca</strong> – Związek Harcerstwa Rzeczypospolitej z
            siedzibą w Warszawie
          </li>
          <li>
            <strong>Usługobiorca</strong> – osoba fizyczna korzystająca z
            Serwisu
          </li>
          <li>
            <strong>Komunikacja Drogą Elektroniczną</strong> – Komunikacja za
            pośrednictwem poczty elektronicznej i formularzy kontaktowych
          </li>
        </ul>

        <h2>II. Postanowienia ogólne</h2>
        <ul>
          <li>Regulamin określa zasady funkcjonowania i użytkowania Serwisu</li>
          <li>
            Serwis udostępnia narzędzia do zarządzania procesem prób i nadawania
            stopni
          </li>
          <li>
            Usługodawca nie ponosi odpowiedzialności za wykorzystanie porad
            zamieszczonych w Serwisie
          </li>
        </ul>

        <h2>III. Warunki używania Serwisu</h2>
        <ul>
          <li>Korzystanie z Serwisu jest nieodpłatne i dobrowolne</li>
          <li>
            Wymagania techniczne:
            <ul>
              <li>Urządzenie z dostępem do internetu</li>
              <li>Nowoczesna przeglądarka internetowa</li>
              <li>Włączona obsługa JavaScript i cookies</li>
            </ul>
          </li>
          <li>
            Zabronione działania:
            <ul>
              <li>Dekompilacja kodu źródłowego</li>
              <li>Nadmierne obciążanie serwera</li>
              <li>Próby włamań i wykradania danych</li>
            </ul>
          </li>
        </ul>

        <h2>IV. Warunki oraz zasady rejestracji</h2>
        <ul>
          <li>Rejestracja jest dobrowolna i nieodpłatna</li>
          <li>Konta aktywne mają wyłącznie członkowie ZHR</li>
          <li>
            Usuwanie konta:
            <ul>
              <li>Możliwe poprzez opcję w panelu użytkownika</li>
              <li>Prowadzi do anonimizacji danych</li>
            </ul>
          </li>
        </ul>

        <h2>V. Przekazanie praw do materiałów</h2>
        <ul>
          <li>
            Użytkownik przekazuje prawa autorskie do treści zamieszczanych w
            Serwisie
          </li>
          <li>
            Usługodawca może wykorzystywać materiały w celach promocyjnych
          </li>
        </ul>

        <h2>VI. Warunki komunikacji</h2>
        <ul>
          <li>
            Formy kontaktu:
            <ul>
              <li>Formularz kontaktowy</li>
              <li>Adres e-mail: eproba@zhr.pl</li>
            </ul>
          </li>
        </ul>

        <h2>VII. Gromadzenie danych</h2>
        <ul>
          <li>Dane przetwarzane zgodnie z Polityką Prywatności</li>
          <li>
            Wykorzystanie cookies do celów statystycznych i funkcjonalnych
          </li>
        </ul>

        <h2>VIII. Prawa autorskie</h2>
        <ul>
          <li>Wszelkie prawa do Serwisu należą do Usługodawcy</li>
          <li>Zabronione kopiowanie treści bez zgody</li>
        </ul>

        <h2>IX. Zmiany Regulaminu</h2>
        <ul>
          <li>Usługodawca może zmieniać Regulamin w dowolnym czasie</li>
          <li>Zmiany wchodzą w życie po 7 dniach od publikacji</li>
        </ul>

        <h2>X. Postanowienia końcowe</h2>
        <ul>
          <li>Usługodawca zastrzega prawo do czasowego wyłączenia Serwisu</li>
          <li>
            Kontakt:
            <ul>
              <li>Formularz kontaktowy w Serwisie</li>
              <li>Adres e-mail: eproba@zhr.pl</li>
            </ul>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
