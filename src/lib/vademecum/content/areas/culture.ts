import { guideposts, hr, important, text } from "../../blocks";
import type { Page } from "../../types";

export const culture: Page = {
  slug: "guideposts/culture",
  chapter: "guideposts",
  title: "Kultura i komunikacja",
  description: "Kultura osobista, komunikacja, odbiór sztuki i twórczość.",
  icon: "messages-square",
  intro: [
    text(
      `„O co chodzi z tą kulturą w stopniach? Na co to komu?” – to pytanie zadawało sobie już wielu przed Tobą i zapewne zada je sobie wielu po Tobie.`,
    ),
    text(
      `Pomyśl o tym jako o sztafecie, w której z pokolenia na pokolenie przekazujemy sobie szczególny „język”. Dzięki niemu nie tylko możesz porozumieć się z naszymi przodkami i następcami (czyli również zrozumieć ich) – bez tego języka trudno nam się dogadać między sobą nawet dzisiaj.`,
    ),
  ],
  sections: [
    {
      title: "Trzymam klasę i zachowuję kulturę osobistą",
      blocks: [
        guideposts(
          "Znam zasady dobrego ubioru (np. wiem, jak łączyć kolory i wzory, jak dobrać rozmiar ubrania itp.), potrafię ubrać się na randkę lub formalną okazję.",
          "Jestem punktualny i komunikuję o ewentualnych opóźnieniach.",
          "Nie przeklinam i nie podnoszę niepotrzebnie głosu.",
          "Znam i stosuję zasady porozumienia bez przemocy (NVC).",
          hr(
            "Potrafię przeanalizować swoja postawę w odbytej dyskusji – również pod kątem stosowania nieuczciwych chwytów.",
          ),
        ),
      ],
    },
    {
      title: "Wypowiadam się w sposób zrozumiały",
      blocks: [
        guideposts(
          "Potrafię przygotować i nagrać kilkuminutowe wystąpienie, poprawne pod kątem retorycznym (ustrukturyzowane, z użyciem gestykulacji, bez mówienia „yyy” itp.).",
          "Poznałem zasady dobrego i ciekawego pisania (np. na kursie lub z książki) i potrafię napisać artykuł, uwzględniając te zasady.",
          "Potrafię przygotować konspekt i przeprowadzić ciekawe zajęcia na kursie zastępowych.",
          "Potrafię porozumieć się w codziennych sytuacjach w czasie podróży za granicą.",
        ),
      ],
    },
    {
      title:
        "Poznaję klasyczne dzieła kultury i kształtuję swoją wrażliwość jako odbiorca sztuki",
      blocks: [
        guideposts(
          "Umiem przedstawić w dyskusji, w jaki sposób wybrane dzieła z kanonu lektur zmieniły moje spojrzenie na świat i wartości lub prawa nim rządzące.",
          "Co najmniej raz w roku odwiedzam wystawę sztuki.",
          "Potrafię, świadomie wybierając repertuar, zorganizować wyjście do teatru, opery lub filharmonii.",
          hr(
            "Znam klasyki kina polskiego (np. filmy Kieślowskiego, Wajdy, Kawalerowicza, Koterskiego, Holland) oraz europejskiego (np. filmy Felliniego, Bergmana).",
          ),
          hr("Potrafię tańczyć dwa tańce towarzyskie."),
        ),
      ],
    },
    {
      title: "Wyrażam się za pomocą sztuki",
      blocks: [
        guideposts(
          "Staram się uczyć technik artystycznych (również amatorsko) i tworzyć wybrane formy sztuki (np. uczę się gry na nowym instrumencie, założyłem zespół muzyczny z kolegami, gram w teatrze szkolnym, majsterkuję z elementem artystycznym).",
          "Potrafię podzielić się swoimi umiejętnościami artystycznymi w harcerstwie na forum szerszym niż drużyna.",
        ),
        important(
          `*Jeżeli jesteś uczniem szkoły artystycznej (np. muzycznej czy plastycznej), to prawdopodobnie ważniejsza dla Twojego rozwoju artystycznego będzie praca nad postawami opisanymi w obszarach życia „Pasje i umiejętności” oraz „Rozum i intelekt”.*`,
        ),
      ],
    },
  ],
};
