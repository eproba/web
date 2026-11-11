import { example, figure, important, text } from "../../blocks";
import type { Page } from "../../types";

export const rhythm: Page = {
  slug: "trial/rhythm",
  chapter: "trial",
  title: "Rytm próby indywidualnej",
  navTitle: "Rytm próby",
  description:
    "Etapy próby na HO i HR: od pierwszego spotkania z opiekunem do zamknięcia próby.",
  icon: "route",
  intro: [
    text(`
      Poniższy schemat przedstawia standardowy sposób prowadzenia próby na HO/HR, z podziałem na etapy. Jeśli zachowacie poniższe wskazówki, próba indywidualna będzie dynamiczna i zwarta.
    `),
    figure("trial-rhythm"),
  ],
  sections: [
    {
      id: "autorefleksja",
      title: "Spotkanie 1 – autorefleksja",
      step: "1",
      then: "1 tydzień",
      blocks: [
        text(`
          Celem pierwszego spotkania z opiekunem jest lepsze poznanie samego siebie. Dodatkowo opiekun będzie miał okazję lepiej poznać Ciebie. Nie przygotowuj propozycji zadań na to pierwsze spotkanie – będzie na to czas w kolejnym kroku. W czasie braterskiej i szczerej rozmowy powinieneś zrobić trzy rzeczy.

          **Po pierwsze** – w rozmowie z opiekunem spróbuj odpowiedzieć sobie na pytania:

          - Jakie są Twoje wady i zalety? Wymień po 4.
          - Jakie masz marzenie na najbliższy rok i na przyszłość (np. co chciałbyś robić za 4 lata)?
          - Czy jest coś, nad czym chciałbyś popracować?
          - Jaką Twoją największą zaletę, a jaką wadę wskazaliby Twoi najbliżsi?
          - Czy któryś punkt Prawa Harcerskiego sprawia Ci szczególny problem?
          - Jak układają się Twoje relacje z najbliższymi?

          **Po drugie** – zastanów się, nad którymi sferami swojego życia powinieneś popracować. Wskazówki, które mogą Ci w tym pomóc, znajdziesz niżej.

          **Po trzecie** – znajdź w Vademecum wybrane obszary życia i zainspiruj się drogowskazami przy formułowaniu zadań (zobacz: [„Obszary w próbach indywidualnych”](/vademecum/trial/areas)).
        `),
      ],
    },
    {
      id: "propozycje-zadan",
      title: "Spotkanie 2 – propozycje zadań",
      step: "2",
      then: "okres przygotowawczy · ok. 3 tygodnie",
      blocks: [
        text(`
          Na drugie spotkanie warto przyjść z propozycjami konkretnych zadań na podstawie wybranych wcześniej obszarów życia i drogowskazów. Wspólnie z opiekunem będziecie mogli je omówić, uszczegółowić lub odrzucić te, które uznacie za słabe. W razie potrzeby wymyślicie nowe propozycje i ustalicie, w jaki sposób można sprawdzić, czy są adekwatne. Po tym spotkaniu rozpocznie się okres przygotowawczy, czyli czas na sprawdzenie, czy zaproponowane zadania są realne do wykonania i odpowiednio dobrane do Twoich potrzeb.
        `),
        example(`
          - Jeśli zechcesz w ramach próby pojechać na rekolekcje w milczeniu, to w trakcie okresu przygotowawczego powinieneś sprawdzić, w jakich rekolekcjach jesteś w stanie wziąć udział, jak one wyglądają, ile kosztują, w jakich są terminach i lokalizacjach.
          - Jeśli w ramach próby będziesz chciał przez 3 miesiące chodzić na siłownię 2 razy w tygodniu, to w okresie przygotowawczym powinieneś zacząć chodzić na siłownię 2 razy w tygodniu – aby sprawdzić, czy realnie masz takie możliwości czasowe.
        `),
        text(`
          Nie ograniczajcie się przy tym do „typowych”, często wybieranych zadań w Waszym środowisku – to, co było dobre dla Twojego kolegi z drużyny, nie musi być koniecznie dobre dla Ciebie.

          **Jeśli istnieje taka potrzeba, możecie spotkać się więcej razy!** Pamiętajcie jednak, aby nie rozciągać przygotowań zbyt długo – między pierwszym spotkaniem a otwarciem próby indywidualnej **nie powinno minąć więcej niż 2 miesiące.**
        `),
      ],
    },
    {
      id: "wybor-zadan",
      title: "Decyzja – wybór zadań",
      step: "3",
      then: "szybko",
      blocks: [
        text(`
          Wybrane zadania powinny być konkretne i mierzalne. Osoba postronna powinna móc łatwo ocenić, czy zadanie zostało, czy nie zostało wykonane.
        `),
        example(`
          Załóżmy, że zauważasz potrzebę zadbania o swoje zdrowie i zmienić swój sposób odżywiania. Chociaż „Będę jadł posiłki regularnie” może brzmieć jak konkretne zadanie, to trudno powiedzieć, kiedy będzie można uznać je za wykonane. Co to znaczy regularnie? W tym wypadku konieczne jest dookreślenie:

          - szczegółowych warunków zadania, np. *Będę codziennie jadł śniadanie przed wyjściem do szkoły (do 7:20) i kolejne 4 posiłki maksymalnie co 4 godziny.*
          - czasu trwania zadania, np. *Przez 40 dni z rzędu będę…*

          W ten sposób warunki zadania stają się jasno określone – jeśli przekroczysz ustalony czas, powinieneś zacząć od nowa liczenie 40 dni, a jeśli nie dałeś rady wytrwać 40 dni z rzędu, to zadanie nie zostało wykonane.
        `),
        text(`
          Sprawdźcie też, czy wybrane zadania nie kumulują się w czasie. Rzadko udaje się rzetelnie realizować większą liczbę zadań równocześnie. Najlepszym sposobem, by uniknąć takiej kumulacji, jest zaplanowanie konkretnych okresów realizacji poszczególnych zadań – tak, aby się one na siebie nie nakładały i uwzględniały inne zobowiązania (rodzinne, szkolne, harcerskie, spotkania ze znajomymi itp).
        `),
        example(
          `
            - Przygotowując się do koncertu, będę przez 4 tygodnie ćwiczył grę na mandolinie 5 razy w tygodniu po 40 minut (w kwietniu).
            - Zorganizuję wycieczkę dla całej rodziny pociągiem od Krakowa, zarezerwuję noclegi, przygotuję plan zwiedzania (drugi weekend maja).
          `,
          "Przykłady",
        ),
      ],
    },
    {
      id: "otwarcie",
      title: "Otwarcie próby indywidualnej i jej realizacja",
      step: "4",
      then: "próba – regularne spotkania z opiekunem",
      blocks: [
        text(`
          Otwieracie próbę indywidualną przed kapitułą/drużynowym i… do dzieła. To jest ten czas, gdy udowadniasz, że potrafisz wykonać zadania i zrealizować cele, które sam sobie obrałeś. Próba indywidualna na HO nie powinna trwać dłużej niż **10 miesięcy**. Na HR – nie więcej niż **12 miesięcy**.

          W czasie próby powinniście się regularnie spotykać z opiekunem, aby omówić Twoje postępy w realizacji zadań. Jeśli w czasie próby razem z opiekunem dojdziecie do przekonania, że jedno z zadań się zdezaktualizowało, to możecie je zmienić – zgłoście się jak najszybciej do kapituły lub drużynowego.
        `),
      ],
    },
    {
      id: "zamkniecie",
      title: "Zamknięcie próby indywidualnej i jej podsumowanie",
      step: "5",
      blocks: [
        text(`
          Na zamknięcie próby indywidualnej powinieneś przygotować:

          - materiały prezentujące, jak zrealizowałeś swoje zadania: opisy, zdjęcia, filmiki, plany itp;
          - podsumowanie zadania – zastanów się, co dała Ci realizacja zadania, czy spełniła swój cel, a jeśli nie – to, co dzisiaj zrobiłbyś inaczej.

          Takie podsumowanie jest ważne nie tylko po to, aby zamknąć próbę indywidualną – jest ono także wartościowe dla Ciebie samego, abyś uczył się wyciągać wnioski z własnych działań.
        `),
        important(`
          Pamiętaj, że w przypadku próby na HO poza wykonaniem próby indywidualnej warunkiem zamknięcia stopnia jest spełnianie wymagań (zobacz [Wymagania na HO](/vademecum/ho#wymagania)).

          Ponadto kapituła lub drużynowy mogą zaproponować Ci próbę końcową, jednak nie zawsze ma to miejsce.
        `),
      ],
    },
  ],
};
