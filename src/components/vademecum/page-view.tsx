import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getNeighbors, pageHref, sectionId } from "@/lib/vademecum/navigation";
import type { Page, Section } from "@/lib/vademecum/types";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Blocks } from "./blocks";
import { HrBadge } from "./hr-badge";
import { InlineMarkdown } from "./markdown";
import { TableOfContents } from "./table-of-contents";

const RANK_LABELS = { ho: "HO", hr: "HR" };

function SectionView({ section }: { section: Section }) {
  return (
    <section
      id={sectionId(section)}
      aria-labelledby={`${sectionId(section)}-title`}
      className="scroll-mt-4 space-y-4"
    >
      <div className="space-y-1.5">
        <h2
          id={`${sectionId(section)}-title`}
          className="flex items-start gap-3 text-xl font-semibold"
        >
          {section.step && (
            <span className="bg-primary text-primary-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm">
              {section.step}
            </span>
          )}
          <span className="min-w-0 flex-1">{section.title}</span>
          {section.rank && (
            <Badge variant="secondary" className="mt-1">
              {RANK_LABELS[section.rank]}
            </Badge>
          )}
        </h2>
        {section.description && (
          <p className="text-muted-foreground">
            <InlineMarkdown>{section.description}</InlineMarkdown>
          </p>
        )}
      </div>
      <Blocks blocks={section.blocks} />
      {section.then && (
        <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <ClockIcon className="size-4" />
          Do następnego kroku: {section.then}
        </p>
      )}
    </section>
  );
}

function Pager({ page }: { page: Page }) {
  const { previous, next } = getNeighbors(page);
  return (
    <nav
      aria-label="Poprzednia i następna strona"
      className="grid gap-4 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={pageHref(previous)}
          className="hover:bg-muted/50 rounded-xl border p-4"
        >
          <span className="text-muted-foreground flex items-center gap-1 text-sm">
            <ArrowLeftIcon className="size-4" />
            Poprzednia
          </span>
          <span className="mt-1 block font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={pageHref(next)}
          className="hover:bg-muted/50 rounded-xl border p-4 text-right"
        >
          <span className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
            Następna
            <ArrowRightIcon className="size-4" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}

const hasHrGuideposts = (page: Page) =>
  page.sections.some((section) =>
    section.blocks.some(
      (block) =>
        block.type === "guideposts" && block.items.some((item) => item.hr),
    ),
  );

export function PageView({
  page,
  header,
  children,
}: {
  page: Page;
  /** Replaces the default page title. */
  header?: ReactNode;
  /** Extra content shown below the page text. */
  children?: ReactNode;
}) {
  const toc = page.sections.map((section) => ({
    id: sectionId(section),
    title: section.title,
  }));
  const showToc = toc.length > 1;

  const parts: ReactNode[] = [];
  if (page.intro) {
    parts.push(
      <div key="intro" className="space-y-4">
        <Blocks blocks={page.intro} />
        {hasHrGuideposts(page) && (
          <p className="text-muted-foreground text-sm">
            Drogowskazy oznaczone <HrBadge /> są przeznaczone przede wszystkim
            dla zdobywających HR, ale każdy może się nimi zainspirować.
          </p>
        )}
      </div>,
    );
  }
  for (const section of page.sections) {
    parts.push(<SectionView key={sectionId(section)} section={section} />);
  }

  return (
    <div
      className={cn(
        "grid items-start gap-8",
        showToc && "xl:grid-cols-[minmax(0,1fr)_13rem]",
      )}
    >
      <article className="min-w-0 space-y-6">
        {header ?? (
          <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
        )}

        {parts.length > 0 && (
          <Card>
            <CardContent className="divide-y text-[0.938rem] *:py-8 *:first:pt-0 *:last:pb-0">
              {parts}
            </CardContent>
          </Card>
        )}

        {children}

        <Pager page={page} />
      </article>

      {showToc && (
        <aside className="sticky top-4 hidden max-h-[calc(100dvh-2rem)] overflow-y-auto xl:block">
          <TableOfContents items={toc} />
        </aside>
      )}
    </div>
  );
}
