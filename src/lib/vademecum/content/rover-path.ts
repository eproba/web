import { figure, text } from "../blocks";
import type { Page } from "../types";

export const roverPath: Page = {
  slug: "rover-path",
  chapter: "rover-path",
  title: "Droga Wędrownika",
  description:
    "Symbolika Watry Wędrowniczej – trzy pola i trzy cele pracy wędrownika.",
  icon: "flame",
  sections: [
    {
      title: "Symbolika Watry Wędrowniczej",
      blocks: [
        text(`
          Harcerz orli i harcerz Rzeczypospolitej to stopnie zdobywane przez wędrowników. Niezależnie od tego, w jakiej drużynie teraz jesteś, zdobywając je, podążasz wędrowniczym szlakiem, którego treść i cel wskazuje symbol Watry Wędrowniczej – oznaka ruchu wędrowników. Przedstawia on ognisko ułożone sposobem skautowym na długotrwałe palenie, umieszczone na zielonym tle. Znak Watry symbolizuje wędrówkę na szlaku i w codziennym życiu.

          Trzy polana symbolizują trzy główne pola pracy wędrowniczej. Jak drewno dokładane do ogniska, są paliwem do utrzymania symbolicznych płomieni – celów pracy wędrownika. Te pola to:

          1. **praca nad sobą**,
          2. **szukanie swojego miejsca w społeczeństwie**,
          3. **służba**.

          Trzy płomienie symbolizują cele pracy wędrownika. W kolejności od najmniejszego płomienia są to:

          1. **siła ciała**,
          2. **siła umysłu**,
          3. oraz najważniejsza – **siła ducha**.
        `),
        figure("campfire"),
        text(`
          Znak watry haftuje się na zielonym tle, co ma przypominać, że wszystko realizuje się na tle harcerskiego życia – wędrówce przez świat. Polana i płomienie watry połączone są żarem symbolizującym realizację pracy wędrowniczej poprzez **wyczyn**.

          Wędrownik poznaje specyfikę pracy wędrowniczej podczas próby na naramiennik, realizowanej w drużynie wędrowników. Jeśli masz taką możliwość, przed otwarciem próby indywidualnej na HO podejdź do próby na naramiennik – szczegóły znajdziesz w Regulaminie Naramiennika Wędrowniczego Organizacji Harcerzy ZHR.
        `),
      ],
    },
  ],
};
