import type { Block, Guidepost, Markdown } from "./types";

// Small helpers that keep the content files (content/**/*.ts) readable.

/** Removes the indentation of multi-line template literals. */
function dedent(text: string) {
  const lines = text.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)![0].length),
  );
  return lines.map((line) => line.slice(indent)).join("\n");
}

export const text = (markdown: Markdown): Block => ({
  type: "text",
  text: dedent(markdown),
});

export const quote = (markdown: Markdown): Block => ({
  type: "quote",
  text: dedent(markdown),
});

export const example = (markdown: Markdown, title = "Przykład"): Block => ({
  type: "callout",
  variant: "example",
  title,
  text: dedent(markdown),
});

export const important = (markdown: Markdown, title = "Uwaga!"): Block => ({
  type: "callout",
  variant: "important",
  title,
  text: dedent(markdown),
});

/** Footnote-like remark. */
export const note = (markdown: Markdown, title?: string): Block => ({
  type: "callout",
  variant: "note",
  title,
  text: dedent(markdown),
});

export const facts = (...rows: [label: string, text: Markdown][]): Block => ({
  type: "facts",
  rows: rows.map(([label, markdown]) => ({ label, text: dedent(markdown) })),
});

export const guideposts = (...items: (Markdown | Guidepost)[]): Block => ({
  type: "guideposts",
  items: items.map((item) =>
    typeof item === "string" ? { text: item } : item,
  ),
});

/** A guidepost meant mainly for the HR trial. */
export const hr = (
  markdown: Markdown,
  seeAlso?: Guidepost["seeAlso"],
): Guidepost => ({ text: markdown, hr: true, seeAlso });

/** A guidepost pointing to a related posture in another area. */
export const see = (
  markdown: Markdown,
  seeAlso: Guidepost["seeAlso"],
): Guidepost => ({ text: markdown, seeAlso });

export const faq = (
  ...items: { question: string; answer: Block[] }[]
): Block => ({ type: "faq", items });

export const figure = (
  name: Extract<Block, { type: "figure" }>["figure"],
): Block => ({
  type: "figure",
  figure: name,
});

export const signature = (...lines: string[]): Block => ({
  type: "signature",
  lines,
});
