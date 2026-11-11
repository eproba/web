import { figure, text } from "../../blocks";
import type { Page } from "../../types";

export const areas: Page = {
  slug: "trial/areas",
  chapter: "trial",
  title: "Nad którymi obszarami pracować?",
  navTitle: "Które obszary wybrać?",
  description:
    "Wskazówki, jak wybrać obszary życia, w których chcesz się rozwinąć w ramach próby.",
  icon: "compass",
  intro: [
    text(`
      Człowiek powinien pracować nad wszystkimi obszarami swojego życia, ale nie nad wszystkimi naraz. Możesz w ramach zadania łączyć różne obszary życia, ale nie przejmuj się, jeśli któregoś w ogóle w niej nie poruszysz – ostatecznie służba i praca nad sobą trwają całe życie.

      Wybierając obszary, w których chcesz się rozwinąć przez zadania próby, kieruj się następującymi wskazówkami.
    `),
    figure("area-hints"),
    text(`
      1. W pierwszej kolejności zwróć uwagę na te obszary, w których:
         - chciałbyś szczególnie podjąć pracę nad sobą, np. masz plany i marzenia z nimi związane,
         - jesteś uzdolniony lub masz predyspozycje.

         Staraj się je rozwinąć tak, aby uczynić z nich Twoje mocne strony.
      2. W drugiej kolejności weź pod uwagę te obszary, w których masz wyraźne problemy, niedomagania czy deficyty i staraj się je zredukować.
      3. Pamiętaj też, że rozwój człowieka powinien być całościowy, tzn. na swojej ścieżce harcerskiej powinieneś rozwijać się we wszystkich obszarach. Zastanów się, czy jakieś obszary życia nie zostały pominięte w Twoich próbach na wcześniejsze stopnie i czy nie przykładasz zbyt dużej wagi do niektórych z nich (np. do [„Zdrowia i sprawności fizycznej”](/vademecum/guideposts/health)).
    `),
  ],
  sections: [],
};
