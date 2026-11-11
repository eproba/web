"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { SearchEntry, SearchIndex } from "@/lib/vademecum/search-index";
import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { HrBadge } from "./hr-badge";

const MIN_QUERY_LENGTH = 2;
const MAX_TITLE_RESULTS = 6;
const MAX_CONTENT_RESULTS = 40;
const SNIPPET_LENGTH = 140;

const DIACRITICS: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

/** Lowercase text without Polish diacritics, keeping character positions. */
const normalize = (text: string) =>
  text.toLowerCase().replace(/[ąćęłńóśźż]/g, (char) => DIACRITICS[char]);

/**
 * Crude Polish stemming: drops the ending of longer words, so that
 * „rekolekcje” also finds „rekolekcjach” and „kapituła” finds „kapitule”.
 */
const stem = (word: string) =>
  word.length >= 6
    ? word.slice(0, -2)
    : word.length >= 4
      ? word.slice(0, -1)
      : word;

const isLetter = (char: string | undefined) =>
  !!char && /[\p{L}\d]/u.test(char);

interface Prepared {
  entry: SearchEntry;
  haystack: string;
}

const prepare = (entries: SearchEntry[], fields: (e: SearchEntry) => string) =>
  entries.map((entry) => ({ entry, haystack: normalize(fields(entry)) }));

const search = (prepared: Prepared[], words: string[], limit: number) =>
  prepared
    .filter(({ haystack }) => words.every((word) => haystack.includes(word)))
    .slice(0, limit)
    .map(({ entry }) => entry);

/** Cuts a fragment of the text around the first match and marks the words. */
function Snippet({ text, words }: { text: string; words: string[] }) {
  const normalized = normalize(text);
  const first = Math.min(
    ...words.map((word) => normalized.indexOf(word)).filter((i) => i >= 0),
  );
  const start =
    Number.isFinite(first) && first > SNIPPET_LENGTH / 2
      ? text.lastIndexOf(" ", first - SNIPPET_LENGTH / 3) + 1
      : 0;
  const end = Math.min(text.length, start + SNIPPET_LENGTH);
  const fragment = text.slice(start, end);
  const normalizedFragment = normalized.slice(start, end);

  const ranges = words
    .flatMap((word) => {
      const found: [number, number][] = [];
      let i = normalizedFragment.indexOf(word);
      while (i >= 0) {
        // mark the whole word, not only the matched stem
        let wordEnd = i + word.length;
        while (isLetter(normalizedFragment[wordEnd])) wordEnd++;
        found.push([i, wordEnd]);
        i = normalizedFragment.indexOf(word, wordEnd);
      }
      return found;
    })
    .sort((a, b) => a[0] - b[0]);

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const [from, to] of ranges) {
    if (from < cursor) continue;
    parts.push(fragment.slice(cursor, from));
    parts.push(
      <mark
        key={from}
        className="text-foreground rounded-sm bg-yellow-200/70 dark:bg-yellow-500/30"
      >
        {fragment.slice(from, to)}
      </mark>,
    );
    cursor = to;
  }
  parts.push(fragment.slice(cursor));

  return (
    <>
      {start > 0 && "…"}
      {parts}
      {end < text.length && "…"}
    </>
  );
}

function ResultLink({
  entry,
  words,
  onSelect,
}: {
  entry: SearchEntry;
  /** Show a text snippet with these words marked. */
  words?: string[];
  onSelect: () => void;
}) {
  return (
    <Link
      href={entry.href}
      onClick={onSelect}
      className="hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 block rounded-md px-2 py-1.5 text-sm outline-none focus-visible:ring-2"
    >
      <span className="text-muted-foreground block truncate text-xs">
        {words || entry.section ? entry.page : "Strona"}
      </span>
      {words ? (
        <span className="line-clamp-3">
          <Snippet text={entry.text} words={words} />
          {entry.hr && (
            <>
              {" "}
              <HrBadge />
            </>
          )}
        </span>
      ) : (
        <span className="block font-medium">{entry.section ?? entry.page}</span>
      )}
    </Link>
  );
}

/**
 * Search field over the whole Vademecum. While a query is typed, the results
 * take the place of `children` (the table of contents).
 */
export function VademecumSearch({
  children,
  onNavigate,
}: {
  children?: ReactNode;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 120);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [wantsIndex, setWantsIndex] = useState(false);

  // The index (all of the content) is loaded only when the field is used.
  useEffect(() => {
    if (!wantsIndex || index) return;
    import("@/lib/vademecum/search-index").then((module) =>
      setIndex(module.buildSearchIndex()),
    );
  }, [wantsIndex, index]);

  const prepared = useMemo(
    () =>
      index && {
        titles: prepare(index.titles, (e) => `${e.page} ${e.section ?? ""}`),
        content: prepare(index.content, (e) => e.text),
      },
    [index],
  );

  const words = useMemo(
    () =>
      normalize(debouncedQuery)
        .split(/[^\p{L}\d]+/u)
        .filter((word) => word.length > 0)
        .map(stem),
    [debouncedQuery],
  );
  const tooShort =
    query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH;
  const active =
    query.trim().length >= MIN_QUERY_LENGTH &&
    debouncedQuery.trim().length >= MIN_QUERY_LENGTH &&
    words.length > 0;

  const results = useMemo(() => {
    if (!prepared || !active) return { titles: [], content: [] };
    return {
      titles: search(prepared.titles, words, MAX_TITLE_RESULTS),
      content: search(prepared.content, words, MAX_CONTENT_RESULTS),
    };
  }, [prepared, words, active]);

  const select = () => {
    setQuery("");
    onNavigate?.();
  };

  const count = results.titles.length + results.content.length;

  return (
    <div className="space-y-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setWantsIndex(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setQuery("");
          }}
          placeholder="Szukaj w Vademecum"
          aria-label="Szukaj w Vademecum"
          className="[&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Wyczyść wyszukiwanie"
              onClick={() => setQuery("")}
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      {tooShort && (
        <p className="text-muted-foreground px-2 text-xs" aria-live="polite">
          Wpisz co najmniej {MIN_QUERY_LENGTH} znaki, aby wyszukać.
        </p>
      )}

      {active ? (
        <div role="region" aria-label="Wyniki wyszukiwania" aria-live="polite">
          {!prepared ? (
            <p className="text-muted-foreground px-2 text-sm">Wczytywanie…</p>
          ) : count === 0 ? (
            <p className="text-muted-foreground px-2 text-sm">
              Nic nie znaleziono. Spróbuj innego słowa.
            </p>
          ) : (
            <div className="space-y-4">
              {results.titles.length > 0 && (
                <div className="space-y-0.5">
                  {results.titles.map((entry) => (
                    <ResultLink
                      key={entry.href}
                      entry={entry}
                      onSelect={select}
                    />
                  ))}
                </div>
              )}
              {results.content.length > 0 && (
                <div className="space-y-0.5">
                  <p className="text-muted-foreground px-2 pb-1 text-xs font-medium">
                    W treści
                  </p>
                  {results.content.map((entry, i) => (
                    <ResultLink
                      key={`${entry.href}-${i}`}
                      entry={entry}
                      words={words}
                      onSelect={select}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
