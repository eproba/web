import { guideposts, hr, text } from "../../blocks";
import type { Page } from "../../types";

export const passions: Page = {
  slug: "guideposts/passions",
  chapter: "guideposts",
  title: "Pasje i umiejętności",
  description:
    "Umiejętności praktyczne, praca zarobkowa, zainteresowania i wolny czas.",
  icon: "sparkles",
  intro: [
    text(
      `Harcerstwo jest pociągające o tyle, o ile robisz w nim nowe, ciekawe i inspirujące dla Ciebie rzeczy. Tak samo jest w naszym życiu – w dużej mierze od Ciebie zależy, czy będzie ono nudne i czy będziesz tylko biernie brał to, co przyniesie Ci los, czy raczej przejdziesz je aktywnie, szukając ciekawego zawodu i fascynujących wyzwań.`,
    ),
  ],
  sections: [
    {
      title: "Rozwijam nowe umiejętności praktyczne",
      blocks: [
        guideposts(
          "Biorę udział w kursach, warsztatach i/lub zajęciach indywidualnych.",
          "Zdobywam uprawnienia państwowe i certyfikaty.",
          hr(
            "Poszukuję swojego przyszłego kierunku zawodowego (np. korzystam z doradztwa zawodowego, rozmawiam z pracownikami różnych branż, odwiedzam miejsca pracy).",
          ),
          hr("Biorę udział w stażach lub praktykach zawodowych."),
        ),
      ],
    },
    {
      title:
        "Znam trud pracy zarobkowej i potrafię gospodarować swoimi pieniędzmi",
      blocks: [
        guideposts(
          "Potrafię zarobić na swoje potrzeby 1000 zł.",
          "Pracowałem fizycznie zarobkowo.",
          "Potrafię przygotować szczegółowy kilkumiesięczny budżet obejmujący wszystkie moje wpływy i wydatki na moje potrzeby.",
          "Potrafię zaoszczędzić pieniądze na swoje wakacje lub na inny cel.",
        ),
      ],
    },
    {
      title: "Mam zainteresowania, które efektywnie rozwijam",
      blocks: [
        guideposts(
          "Dzielę się swoimi zainteresowaniami z innymi, uczę ich i dzielę się swoją pasją.",
          hr(
            "W wybranej dziedzinie postawiłem sobie ponadprzeciętny cel i go osiągnąłem.",
          ),
        ),
      ],
    },
    {
      title: "Wolny czas spędzam w sposób kreatywny i ambitny",
      blocks: [
        guideposts(
          "Próbuję poszerzać swoje zainteresowania, zdobywając umiejętności i wiedzę z nowych dziedzin.",
          "Regularnie czytam książki.",
          hr(
            "Świadomie i systematycznie uprawiam swoją pasję w celu zachowania równowagi psychicznej.",
          ),
        ),
      ],
    },
  ],
};
