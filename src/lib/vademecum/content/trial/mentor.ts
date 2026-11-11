import { text } from "../../blocks";
import type { Page } from "../../types";

export const mentor: Page = {
  slug: "trial/mentor",
  chapter: "trial",
  title: "Opiekun próby",
  description:
    "Kim jest opiekun próby, jakie ma zadania i kogo wybrać na opiekuna.",
  icon: "user-round-check",
  intro: [
    text(`
      Opiekun to Twój harcerski starszy brat, który będzie Ci towarzyszył w realizacji próby – od początku aż do jej końca. Przed opiekunem stoją 3 zadania:
    `),
  ],
  sections: [
    {
      title: "Pomoże lepiej poznać siebie",
      step: "1",
      blocks: [
        text(`
          Pierwsze z nich to pomóc Ci lepiej poznać siebie. Każdy z nas uczy się samooceny i autorefleksji i szczególnie w pierwszych próbach trudno jest zachować w tym właściwą równowagę. Mamy tendencję do przesadnego krytycyzmu wobec siebie, a niekiedy wręcz przeciwnie – pobłażamy sobie. Opiekun pomoże Ci spojrzeć na siebie z pewnego dystansu i zadba, aby „lustro”, w którym będziesz się przyglądał, nie zniekształciło Twojego obrazu. Jednak tylko opiekun, który Cię dobrze pozna, będzie w stanie Cię wesprzeć – dlatego bądź z nim szczery. Nie próbuj przedstawiać siebie lepszym niż jesteś ani nie koncentruj się wyłącznie na swych słabościach.

          Pamiętaj – w przyszłości też możesz zostać opiekunem próby na stopień młodszego brata – zwróć wtedy szczególną uwagę, aby dobrze poznać harcerza, który obdarzył Cię swoim zaufaniem.
        `),
      ],
    },
    {
      title: "Doradzi przy wyborze zadań",
      step: "2",
      blocks: [
        text(`
          Opiekun doradzi Ci przy wyborze zadań do próby indywidualnej. Pomoże też ocenić, czy próba jest dobrze skomponowana, realna, a jednocześnie ambitna. Opiekun będzie Ci również towarzyszył w czasie otwierania próby indywidualnej przed kapitułą.
        `),
      ],
    },
    {
      title: "Wspiera w realizacji zadań",
      step: "3",
      blocks: [
        text(`
          Po otwarciu próby indywidualnej będzie wspierał Cię w realizacji zadań, a jeśli zajdzie taka potrzeba, pomoże podjąć decyzję o zmianie zadania, które się zdezaktualizowało.
        `),
      ],
    },
    {
      title: "Kogo wybrać na opiekuna?",
      blocks: [
        text(`
          Żeby sprostać tym zadaniom, na opiekuna powinieneś wybrać osobę, której jesteś gotów zaufać i która dodatkowo:

          - dobrze Cię zna,
          - ma doświadczenie przy układaniu prób indywidualnych,
          - jest mądra i dojrzała,
          - jest dla Ciebie przykładem harcerskiej postawy.

          Oczywiście nie zawsze uda się znaleźć osobę, która będzie spełniała wszystkie powyższe kryteria. Będziesz musiał wtedy zdecydować, kogo wybrać. Pamiętaj jednak, że:

          - jeśli chcesz zdobywać HO, to Twój opiekun musi mieć stopień HO, ale najlepiej, aby miał już otwartą próbę indywidualną na stopień HR-a.
          - jeśli chcesz zdobywać HR–a, to Twój opiekun musi mieć stopień HR-a.
        `),
      ],
    },
  ],
};
