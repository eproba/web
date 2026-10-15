const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 60;
const HIT_HIGHLIGHT_MS = 2500;
const INDEXED_BLOCKS =
  "li, p:not(.signature):not(.wf-lbl), .a, .fs-body, summary, .callout > div > div";
const MIN_TEXT_LENGTH = 8;

type Entry = {
  id: string;
  pageId: string;
  area: string;
  group: string;
  text: string;
  folded: string;
  hr: boolean;
};

const collapse = (s: string) => s.replace(/\s+/g, " ").trim();

// Lower-cases and strips Polish diacritics one character at a time, so the
// folded string keeps the same indices as the original text.
const fold = (s: string) =>
  s
    .split("")
    .map((c) => {
      const f = c
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace("ł", "l");
      return f.length === 1 ? f : c.toLowerCase();
    })
    .join("");

const plural = (n: number) => {
  if (n === 1) return "wynik";
  const last = n % 10;
  const teens = n % 100 >= 12 && n % 100 <= 14;
  return last >= 2 && last <= 4 && !teens ? "wyniki" : "wyników";
};

const textOf = (el: Element) => collapse(el.textContent ?? "");

// Heading of the part of the page a block belongs to (postawa, stepper step, FAQ question).
function groupOf(el: HTMLElement) {
  const heading =
    el.closest(".track")?.querySelector("h2") ??
    el.closest(".step")?.querySelector("h3") ??
    el.closest("details")?.querySelector("summary");
  return heading ? textOf(heading).replace(/^[\d\s.]+/, "") : "";
}

function buildIndex(root: HTMLElement): Entry[] {
  const entries: Entry[] = [];
  root.querySelectorAll<HTMLElement>(".page").forEach((page) => {
    const pageId = page.id.replace("page-", "");
    const area = textOf(page.querySelector("h1") ?? page);
    page.querySelectorAll<HTMLElement>(INDEXED_BLOCKS).forEach((el) => {
      if (el.closest(".pager")) return;
      const txt =
        el.tagName === "LI"
          ? el.querySelector<HTMLElement>(":scope > .txt")
          : null;
      const node = txt ?? el;
      // leaf blocks only: a container is represented by the blocks inside it
      if (!txt && node.querySelector(INDEXED_BLOCKS)) return;
      const text = textOf(node);
      if (text.length < MIN_TEXT_LENGTH) return;
      const id = `s${entries.length}`;
      node.dataset.sid = id;
      entries.push({
        id,
        pageId,
        area,
        group: node === el && el.tagName === "SUMMARY" ? "" : groupOf(el),
        text,
        folded: fold(text),
        hr: el.classList.contains("hr-only"),
      });
    });
  });
  return entries;
}

/** [start, end) ranges of every term occurrence, merged. */
function matchRanges(folded: string, terms: string[]): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  for (const term of terms) {
    for (
      let i = folded.indexOf(term);
      i >= 0;
      i = folded.indexOf(term, i + term.length)
    ) {
      ranges.push([i, i + term.length]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  return merged;
}

function highlighted(text: string, ranges: Array<[number, number]>) {
  const span = document.createElement("span");
  span.className = "sr-text";
  let pos = 0;
  for (const [start, end] of ranges) {
    span.append(text.slice(pos, start));
    const mark = document.createElement("mark");
    mark.textContent = text.slice(start, end);
    span.append(mark);
    pos = end;
  }
  span.append(text.slice(pos));
  return span;
}

function resultButton(entry: Entry, ranges: Array<[number, number]>) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sr-item";
  button.setAttribute("data-page", entry.pageId);
  button.setAttribute("data-crumb-title", entry.area);
  button.setAttribute("data-hit", entry.id);

  const meta = document.createElement("span");
  meta.className = "sr-meta";
  meta.append(entry.group);
  if (entry.hr) {
    const chip = document.createElement("span");
    chip.className = "sr-hr";
    chip.textContent = "HR";
    meta.append(chip);
  }
  button.append(meta, highlighted(entry.text, ranges));
  return button;
}

/**
 * Searches every "Drogowskazy" area at once: results replace the menu in the
 * sidebar and clicking one opens its area and highlights the matching block.
 */
export function createSearch(root: HTMLElement, sidebar: HTMLElement) {
  const results = root.querySelector<HTMLElement>("#searchResults");
  let index: Entry[] | null = null;
  let hitElement: HTMLElement | null = null;
  let hitTimer: number | undefined;

  const render = (children: Node[]) => {
    results?.replaceChildren(...children);
  };

  const note = (className: string, text: string) => {
    const el = document.createElement("div");
    el.className = className;
    el.textContent = text;
    return el;
  };

  return {
    run(rawQuery: string) {
      const query = collapse(rawQuery);
      const active = query.length >= MIN_QUERY_LENGTH;
      sidebar.classList.toggle("searching", active);
      if (!active) return render([]);

      index ??= buildIndex(root);
      const terms = fold(query).split(" ");
      const matches = index.filter((e) => {
        const haystack = `${e.folded} ${fold(e.group)}`;
        return terms.every((t) => haystack.includes(t));
      });
      if (matches.length === 0) {
        return render([
          note("sr-empty", "Żaden drogowskaz nie pasuje do wyszukiwania."),
        ]);
      }

      const nodes: Node[] = [
        note("sr-count", `${matches.length} ${plural(matches.length)}`),
      ];
      let lastArea = "";
      for (const entry of matches.slice(0, MAX_RESULTS)) {
        if (entry.area !== lastArea) {
          nodes.push(note("sr-group", entry.area));
          lastArea = entry.area;
        }
        nodes.push(resultButton(entry, matchRanges(entry.folded, terms)));
      }
      if (matches.length > MAX_RESULTS) {
        nodes.push(
          note(
            "sr-empty",
            `…i jeszcze ${matches.length - MAX_RESULTS}. Zawęź wyszukiwanie.`,
          ),
        );
      }
      render(nodes);
    },

    /** Scrolls to a search hit on the (already shown) page and flashes it. */
    reveal(id: string) {
      const el = root.querySelector<HTMLElement>(`[data-sid="${id}"]`);
      if (!el) return;
      el.closest("details")?.setAttribute("open", "");
      const step = el.closest(".funnel-step");
      step?.classList.add("open");
      step?.querySelector(".band")?.setAttribute("aria-expanded", "true");
      hitElement?.classList.remove("search-hit");
      window.clearTimeout(hitTimer);
      hitElement = el;
      el.classList.add("search-hit");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      hitTimer = window.setTimeout(
        () => el.classList.remove("search-hit"),
        HIT_HIGHLIGHT_MS,
      );
    },
  };
}
