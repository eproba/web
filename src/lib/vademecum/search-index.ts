import { PAGES, pageHref, sectionId } from "./navigation";
import type { Block, Markdown, Page } from "./types";

export interface SearchEntry {
  href: string;
  /** Page title. */
  page: string;
  section?: string;
  /** Plain text of a paragraph, list item or guidepost. */
  text: string;
  hr?: boolean;
}

export interface SearchIndex {
  /** One entry per page and per section, matched by their titles. */
  titles: SearchEntry[];
  /** One entry per paragraph, list item or guidepost. */
  content: SearchEntry[];
}

/** Plain text of a Markdown fragment, good enough for searching. */
export function toPlainText(markdown: Markdown) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_\\#]/g, "")
    .replace(/^\s*(?:-|\d+\.)\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function blockTexts(block: Block): { text: string; hr?: boolean }[] {
  switch (block.type) {
    case "text":
      // paragraphs and list items separately
      return block.text
        .split(/\n{2,}|\n(?=\s*(?:-|\d+\.) )/)
        .map((part) => ({ text: toPlainText(part) }));
    case "quote":
    case "callout":
      return [{ text: toPlainText(block.text) }];
    case "facts":
      return block.rows.map((row) => ({
        text: `${row.label}: ${toPlainText(row.text)}`,
      }));
    case "guideposts":
      return block.items.map((item) => ({
        text: toPlainText(item.text),
        hr: item.hr,
      }));
    case "faq":
      return block.items.map((item) => ({
        text: [
          item.question,
          ...item.answer.flatMap(blockTexts).map((part) => part.text),
        ].join(" "),
      }));
    default:
      return [];
  }
}

const pageLabel = (page: Page) => page.title;

/** Imported lazily, after the search dialog is opened for the first time. */
export function buildSearchIndex(): SearchIndex {
  const titles: SearchEntry[] = [];
  const content: SearchEntry[] = [];

  for (const page of PAGES) {
    const href = pageHref(page);
    const label = pageLabel(page);
    titles.push({ href, page: label, text: page.description });

    for (const part of (page.intro ?? []).flatMap(blockTexts)) {
      if (part.text) content.push({ href, page: label, ...part });
    }

    for (const section of page.sections) {
      const sectionHref = `${href}#${sectionId(section)}`;
      const base = { href: sectionHref, page: label, section: section.title };
      titles.push({ ...base, text: toPlainText(section.description ?? "") });
      for (const part of section.blocks.flatMap(blockTexts)) {
        if (part.text) content.push({ ...base, ...part });
      }
    }
  }

  return { titles, content };
}
