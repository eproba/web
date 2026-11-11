/**
 * Content model of the Vademecum (HO/HR individual trials handbook).
 *
 * Text fields hold Markdown (bold, italics, lists and links to other
 * Vademecum pages), rendered with the app's typography.
 */
export type Markdown = string;

export type Rank = "ho" | "hr";

export type ChapterId = "rover-path" | "ho" | "hr" | "trial" | "guideposts";

export type IconName =
  | "book-open"
  | "flame"
  | "award"
  | "crown"
  | "user-round-check"
  | "users"
  | "route"
  | "list-checks"
  | "compass"
  | "message-circle-question"
  | "signpost"
  | "church"
  | "shield"
  | "brain"
  | "heart-pulse"
  | "hand-heart"
  | "landmark"
  | "house"
  | "sparkles"
  | "messages-square"
  | "trees";

/** A single guidepost: a concrete hint for building an individual task. */
export interface Guidepost {
  text: Markdown;
  /** Meant mainly for the HR trial (marked with an „HR” symbol in print). */
  hr?: boolean;
  /** Pointer to a related posture in another area („Zajrzyj też do…”). */
  seeAlso?: Markdown;
}

export type Block =
  | { type: "text"; text: Markdown }
  /** A sentence set apart from the text, e.g. the posture of service. */
  | { type: "quote"; text: Markdown }
  | {
      type: "callout";
      variant: "example" | "important" | "note";
      title?: string;
      text: Markdown;
    }
  /** Label/value rows, e.g. age, conditions and duration of a rank. */
  | { type: "facts"; rows: { label: string; text: Markdown }[] }
  | { type: "guideposts"; items: Guidepost[] }
  | { type: "faq"; items: { question: string; answer: Block[] }[] }
  | {
      type: "figure";
      figure: "campfire" | "area-hints" | "task-funnel" | "trial-rhythm";
    }
  | { type: "signature"; lines: string[] };

export interface Section {
  title: string;
  /** Anchor; derived from the title when omitted. */
  id?: string;
  /** Short lead shown under the title. */
  description?: Markdown;
  /** Step number, e.g. in the trial rhythm. */
  step?: string;
  /** Time until the next step, shown between step cards. */
  then?: string;
  /** Section that applies to one rank only. */
  rank?: Rank;
  blocks: Block[];
}

export interface Page {
  /** Path below /vademecum; empty for the start page. */
  slug: string;
  chapter?: ChapterId;
  title: string;
  /** Shorter title for navigation. */
  navTitle?: string;
  /** Used for page metadata and on overview cards. */
  description: string;
  icon?: IconName;
  intro?: Block[];
  sections: Section[];
}
