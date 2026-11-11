import type { ChapterId, Page } from "../types";
import { character } from "./areas/character";
import { culture } from "./areas/culture";
import { faith } from "./areas/faith";
import { family } from "./areas/family";
import { health } from "./areas/health";
import { homeland } from "./areas/homeland";
import { intellect } from "./areas/intellect";
import { nature } from "./areas/nature";
import { passions } from "./areas/passions";
import { service } from "./areas/service";
import { guideposts } from "./guideposts";
import { rankHo } from "./rank-ho";
import { rankHr } from "./rank-hr";
import { roverPath } from "./rover-path";
import { areas } from "./trial/areas";
import { board } from "./trial/board";
import { faq } from "./trial/faq";
import { mentor } from "./trial/mentor";
import { rhythm } from "./trial/rhythm";
import { tasks } from "./trial/tasks";
import { welcome } from "./welcome";

export interface Chapter {
  id: ChapterId;
  number: string;
  title: string;
  description: string;
  pages: Page[];
}

/** Chapters in the order of the printed edition. */
export const CHAPTERS: Chapter[] = [
  {
    id: "rover-path",
    description: "Symbolika Watry Wędrowniczej – pola i cele pracy wędrownika.",
    number: "01",
    title: "Droga Wędrownika",
    pages: [roverPath],
  },
  {
    id: "ho",
    description: "Sylwetka, warunki zdobycia, wymagania i wytyczne do zadań.",
    number: "02",
    title: "Harcerz orli",
    pages: [rankHo],
  },
  {
    id: "hr",
    description:
      "Sylwetka harcerza Rzeczypospolitej i warunki zdobycia stopnia.",
    number: "03",
    title: "Harcerz Rzeczypospolitej",
    pages: [rankHr],
  },
  {
    id: "trial",
    description: "Opiekun, kapituła, rytm próby i jak ułożyć dobre zadanie.",
    number: "04",
    title: "Układanie próby indywidualnej",
    pages: [mentor, board, rhythm, tasks, areas, faq],
  },
  {
    id: "guideposts",
    description:
      "Obszary życia, postawy i drogowskazy do zadań indywidualnych.",
    number: "05",
    title: "Drogowskazy",
    pages: [
      guideposts,
      faith,
      character,
      intellect,
      health,
      service,
      homeland,
      family,
      passions,
      culture,
      nature,
    ],
  },
];

export const START_PAGE = welcome;

/** All pages in reading order, starting with the welcome letter. */
export const PAGES: Page[] = [
  welcome,
  ...CHAPTERS.flatMap((chapter) => chapter.pages),
];

/** Areas of life, i.e. the pages below "Drogowskazy". */
export const AREAS = CHAPTERS.find((c) => c.id === "guideposts")!.pages.slice(
  1,
);
