import { facts, note, text } from "../blocks";
import type { Page } from "../types";

export const rankHr: Page = {
  slug: "hr",
  chapter: "hr",
  title: "Harcerz Rzeczypospolitej",
  description: "Sylwetka harcerza Rzeczypospolitej i warunki zdobycia stopnia.",
  icon: "crown",
  sections: [
    {
      id: "sylwetka",
      title: "Sylwetka harcerza Rzeczypospolitej",
      blocks: [
        text(`
          Harcerz Rzeczypospolitej wymaga od siebie nawet wtedy, gdy inni od niego nie wymagają. Wstępuje w dorosłe życie jako świadomy i aktywny obywatel. W swoich wyborach kieruje się wiarą i chrześcijańskim systemem wartości. Ma marzenia i je realizuje. Wyróżniającymi się postawą i działaniem krzewi harcerskie ideały. Jego życie przepełnione jest miłością do Ojczyzny, pożyteczną służbą Polsce i bliźnim oraz harmonijnym, wszechstronnym rozwojem własnej osoby. Wytrwale podąża obraną drogą.
        `),
      ],
    },
    {
      id: "jak-zdobyc",
      title: "Jak zdobyć HR?",
      blocks: [
        facts(
          ["Wiek zdobywania stopnia", "od 17. roku życia"],
          [
            "Warunki zdobycia stopnia",
            `
              1. Ułóż i wykonaj zadania w ramach próby indywidualnej.
              2. Bierz aktywny udział w życiu drużyny w okresie zdobywania stopnia.
              3. Spełnij dodatkowe warunki obowiązujące w środowisku.*
            `,
          ],
          ["Czas na wykonanie próby indywidualnej", "do 12 miesięcy"],
          ["Proponowana liczba zadań", "5–8"],
        ),
        text(`
          W odróżnieniu od wcześniejszych stopni, przy zdobywaniu HR nie ma wymagań jednolitych dla wszystkich wędrowników. Opiera się ono w pełni na zadaniach indywidualnych i dążeniu do osiągnięcia sylwetki tego stopnia.

          W Vademecum znajdziesz opis [rytmu próby indywidualnej](/vademecum/trial/rhythm), opis, czym jest [kapituła stopnia](/vademecum/trial/board), informacje na temat [pracy z opiekunem](/vademecum/trial/mentor) oraz [poradnik dot. wyznaczania zadań indywidualnych](/vademecum/trial/tasks) w próbie. Przeczytaj koniecznie rozdział „Układanie próby indywidualnej na stopnie HO i HR”.
        `),
        note(`
          \\* Elementem zdobycia stopnia HR, zgodnie ze zwyczajem przyjętym w środowisku, może być np. zaliczenie próby końcowej. Dodatkowe elementy w zdobywaniu stopnia ustala kapituła lub wprowadza je drużynowy.
        `),
      ],
    },
  ],
};
