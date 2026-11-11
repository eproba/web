import { example, faq as faqBlock, text } from "../../blocks";
import type { Page } from "../../types";

export const faq: Page = {
  slug: "trial/faq",
  chapter: "trial",
  title: "FAQ",
  description:
    "Najczęstsze pytania o drogowskazy, wymagania i tryb zdobywania stopni.",
  icon: "message-circle-question",
  intro: [
    faqBlock(
      {
        question:
          "Czy każdy harcerz zamykając stopień HO i HR, powinien spełniać wszystko to, co jest zawarte w Drogowskazach?",
        answer: [
          text(`
            **Nie!** Prawdopodobnie nie ma takiej osoby na świecie. Drogowskazy mają Cię zainspirować co do tematyki zadania, jeśli zdecydowalibyście się pracować nad daną postawą.
          `),
        ],
      },
      {
        question:
          "Co, jeśli chciałbym popracować nad daną postawą, ale zaproponowane w Vademecum drogowskazy nie do końca wpisują się w moje życie albo mam lepszy pomysł na zadanie? Czy przy układaniu zadania jestem ograniczony drogowskazami?",
        answer: [
          text(`
            **Nie.** Możesz razem z opiekunem ułożyć zadanie w oparciu o kompetencję nie wypisaną poniżej w formie drogowskazu. Pamiętaj jednak, że jest to „wyższa szkoła jazdy” prowadzenia stopnia, więc najlepiej skonsultować to wcześniej z instruktorem.
          `),
        ],
      },
      {
        question:
          "Czy można łączyć spełnianie wymagań na stopień z zadaniami indywidualnymi w ramach próby indywidualnej?",
        answer: [
          text(`
            **Tak.** Jeżeli zdobycie wiedzy czy umiejętności zawartych w [wymaganiach na stopień](/vademecum/ho#wymagania) nie będzie możliwe w ramach zbiórek i wyjazdów drużyny, można połączyć je z zadaniami indywidualnymi w ramach próby indywidualnej. W takiej sytuacji ważne jest, aby skonstruowane zadanie spełniało obydwa cele: zarówno rozwijało Cię indywidualnie, przybliżając do sylwetki stopnia, który zdobywasz; jak i uczyło Cię wymaganej na dany stopień wiedzy czy umiejętności. W ocenie, czy wymyślone przez Ciebie zadanie spełnia kryteria realizacji zarówno wymagania, jak i zadania indywidualnego, pomoże Ci Twój opiekun i kapituła stopnia.
          `),
          example(`
            Jeżeli w ramach zadania indywidualnego będziesz chciał również spełnić wymaganie dot. umiejętności posługiwania się językiem obcym, w praktyce zadbaj o to, żeby takie zadanie rozwijało w Tobie postawę, nad którą chcesz pracować np. [*Buduję braterstwo z ludźmi z Europy i z całego świata*](/vademecum/guideposts/homeland#buduje-braterstwo-z-ludzmi-z-europy-i-z-calego-swiata) z obszaru *Małe ojczyzny, Polska i świat*.
          `),
        ],
      },
      {
        question:
          "Czy opisany powyżej tryb zdobywania HR-a jest jedynym obowiązującym?",
        answer: [
          text(`
            **Nie.** Niektóre środowiska eksperymentują również z innymi trybami (np. opierające się na ciągłej pracy ze Starszym Bratem). Jeśli tak jest u Ciebie w środowisku, to po informacje, jak będzie wyglądać próba, skieruj się do swojego drużynowego.
          `),
        ],
      },
    ),
  ],
  sections: [],
};
