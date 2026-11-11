import { CHAPTERS, PAGES, START_PAGE } from "./content";
import { slugify } from "./slugify";
import type { IconName, Page, Section } from "./types";

export const BASE_PATH = "/vademecum";
export const PDF_URL = "/vademecum/vademecum-2026.pdf";

export const pageHref = (page: Pick<Page, "slug">) =>
  page.slug ? `${BASE_PATH}/${page.slug}` : BASE_PATH;

export const sectionId = (section: Section) =>
  section.id ?? slugify(section.title);

const BY_SLUG = new Map(PAGES.map((page) => [page.slug, page]));

export const getPage = (slug: string) => BY_SLUG.get(slug);

export const getChapter = (page: Page) =>
  CHAPTERS.find((chapter) => chapter.id === page.chapter);

export function getNeighbors(page: Page) {
  const index = PAGES.indexOf(page);
  return {
    previous: index > 0 ? PAGES[index - 1] : undefined,
    next: index < PAGES.length - 1 ? PAGES[index + 1] : undefined,
  };
}

/** Serializable navigation tree passed to client components. */
export interface NavLink {
  href: string;
  title: string;
  icon?: IconName;
}

export interface NavChapter {
  number: string;
  title: string;
  links: NavLink[];
}

const toLink = (page: Page): NavLink => ({
  href: pageHref(page),
  title: page.navTitle ?? page.title,
  icon: page.icon,
});

export function getNavigation(): { start: NavLink; chapters: NavChapter[] } {
  return {
    start: { href: BASE_PATH, title: "Wstęp", icon: "book-open" },
    chapters: CHAPTERS.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      links: chapter.pages.map(toLink),
    })),
  };
}

export { CHAPTERS, PAGES, START_PAGE };
