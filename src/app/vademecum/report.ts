import { VADEMECUM_BODY } from "./vademecum-body";

const MAIL_TO = "lech.pastwa@zhr.pl";
const SOURCE_FILE = "src/app/vademecum/vademecum-body.ts";
const TEXT_BLOCKS =
  "p:not(.signature), .txt, li, summary, .a, .fs-body, .callout > div, .callout > div > div";
const NOT_REPORTABLE = ".pager, [data-no-report]";
const MIN_TEXT_LENGTH = 12;
const QUOTE_LENGTH = 60;
const NAVBAR_HEIGHT = 64;

const collapse = (s: string) => s.replace(/\s+/g, " ").trim();
const textOf = (el: Element) => collapse(el.textContent ?? "");
const asQuote = (s: string) => s.replace(/"/g, "'");

// VADEMECUM_BODY starts right after the opening backtick on line 1 of
// vademecum-body.ts, so entry `i` below is line `i + 1` of that file.
const sourceLines = VADEMECUM_BODY.split("\n");
let plainLines: string[] | null = null;

const stripTags = (line: string) =>
  asQuote(
    collapse(
      line
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " "),
    ),
  );

function findSourceLine(pageId: string, quote: string): number | null {
  plainLines ??= sourceLines.map(stripTags);
  const start = sourceLines.findIndex((l) => l.includes(`id="page-${pageId}"`));
  if (start < 0) return null;
  let end = sourceLines.findIndex(
    (l, i) => i > start && l.includes('<section class="page'),
  );
  if (end < 0) end = sourceLines.length;
  const needle = quote.replace(/\.\.\.$/, "");
  for (let i = start; i < end; i++) {
    if (plainLines[i].includes(needle)) return i + 1;
  }
  return null;
}

function quoteOf(el: Element) {
  const text = asQuote(textOf(el));
  if (text.length <= QUOTE_LENGTH) return text;
  const cut = text.slice(0, QUOTE_LENGTH);
  const space = cut.lastIndexOf(" ");
  return (space > QUOTE_LENGTH / 2 ? cut.slice(0, space) : cut) + "...";
}

const canonical = (el: HTMLElement) =>
  (el.tagName === "LI" && el.querySelector<HTMLElement>(":scope > .txt")) || el;

const isReportable = (el: HTMLElement) =>
  !!el.closest(".page.active") &&
  !el.closest(NOT_REPORTABLE) &&
  textOf(el).length >= MIN_TEXT_LENGTH;

function resolveReportable(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof Element)) return null;
  let el = node.closest<HTMLElement>(TEXT_BLOCKS);
  while (el) {
    const block = canonical(el);
    if (isReportable(block)) return block;
    el = el.parentElement?.closest<HTMLElement>(TEXT_BLOCKS) ?? null;
  }
  return null;
}

/**
 * Floating "Zgłoś poprawkę" button that follows the hovered / tapped text
 * block and opens a prefilled mailto: with a quote and its source line.
 */
export function createReporter(root: HTMLElement) {
  const button = root.querySelector<HTMLAnchorElement>("#reportBtn");
  let target: HTMLElement | null = null;

  const position = () => {
    if (!button || !target) return;
    const r = target.getBoundingClientRect();
    const bw = button.offsetWidth;
    const bh = button.offsetHeight;
    const top = Math.min(
      Math.max(r.top - bh / 2, NAVBAR_HEIGHT),
      Math.max(r.bottom - bh, NAVBAR_HEIGHT),
    );
    const left = Math.max(
      8,
      Math.min(r.right - bw - 4, window.innerWidth - bw - 8),
    );
    button.style.top = `${top}px`;
    button.style.left = `${left}px`;
  };

  const hide = () => {
    button?.classList.remove("show");
    target?.classList.remove("report-target");
    target = null;
  };

  const show = (el: HTMLElement) => {
    if (!button) return;
    const pageId = (el.closest(".page")?.id ?? "").replace(/^page-/, "");
    const quote = quoteOf(el);
    const line = findSourceLine(pageId, quote);
    const message = `do poprawy "${quote}" plik: ${SOURCE_FILE}, linia ${line ?? "?"}`;
    const subject = `Vademecum: zgłoszenie poprawki (${pageId})`;
    button.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    target?.classList.remove("report-target");
    target = el;
    el.classList.add("report-target");
    button.classList.add("show");
    position();
  };

  return {
    hide,

    /** Returns true when the click landed on the button itself (let the mailto: open). */
    onClick(node: Element): boolean {
      if (node.closest("#reportBtn")) return true;
      const el = resolveReportable(node);
      if (!el) {
        hide();
        return false;
      }
      if (el !== target) show(el);
      // layout can shift after the click (FAQ toggle, funnel animation)
      requestAnimationFrame(position);
      window.setTimeout(position, 400);
      return false;
    },

    onHover(node: Element) {
      if (node.closest("#reportBtn")) return;
      const el = resolveReportable(node);
      if (el) {
        if (el !== target) show(el);
      } else if (
        !node.closest(".page.active") ||
        node.closest(NOT_REPORTABLE)
      ) {
        hide();
      }
    },

    onKey(e: KeyboardEvent) {
      if (e.key === "Escape") hide();
    },
  };
}
