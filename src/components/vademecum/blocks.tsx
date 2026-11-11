import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Block } from "@/lib/vademecum/types";
import {
  ArrowRightIcon,
  CornerDownRightIcon,
  InfoIcon,
  LightbulbIcon,
  TriangleAlertIcon,
} from "lucide-react";

import {
  AreaHintsFigure,
  CampfireFigure,
  TaskFunnelFigure,
  TrialRhythmFigure,
} from "./figures";
import { HrBadge } from "./hr-badge";
import { InlineMarkdown, Markdown } from "./markdown";

const CALLOUTS = {
  example: {
    icon: LightbulbIcon,
    className: "border-blue-500 bg-blue-50/50 dark:bg-blue-950/50",
    iconClassName: "text-blue-500",
  },
  important: {
    icon: TriangleAlertIcon,
    className: "border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/40",
    iconClassName: "text-yellow-600 dark:text-yellow-500",
  },
  note: {
    icon: InfoIcon,
    className: "border-border bg-muted/40 text-muted-foreground text-xs",
    iconClassName: "text-muted-foreground",
  },
};

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <Markdown>{block.text}</Markdown>;

    case "quote":
      return (
        <blockquote className="border-foreground/20 border-l-2 pl-4 text-lg font-medium">
          <InlineMarkdown>{block.text}</InlineMarkdown>
        </blockquote>
      );

    case "callout": {
      const style = CALLOUTS[block.variant];
      const Icon = style.icon;
      return (
        <aside
          className={cn("rounded-r-lg border-l-4 px-4 py-3", style.className)}
        >
          {block.title && (
            <p className="mb-1.5 flex items-center gap-2 font-medium">
              <Icon className={cn("size-4", style.iconClassName)} />
              {block.title}
            </p>
          )}
          <Markdown>{block.text}</Markdown>
        </aside>
      );
    }

    case "facts":
      return (
        <dl className="divide-y rounded-lg border">
          {block.rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd>
                <Markdown className="font-medium">{row.text}</Markdown>
              </dd>
            </div>
          ))}
        </dl>
      );

    case "guideposts":
      return (
        <ul className="max-w-[72ch] space-y-2.5">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-2.5">
              <ArrowRightIcon
                aria-hidden
                className="mt-1 size-4 shrink-0 text-[#1abc9c]"
              />
              <div className="min-w-0 space-y-1">
                <p>
                  <InlineMarkdown>{item.text}</InlineMarkdown>
                  {item.hr && (
                    <>
                      {" "}
                      <HrBadge />
                    </>
                  )}
                </p>
                {item.seeAlso && (
                  <p className="text-muted-foreground flex gap-1.5 text-xs">
                    <CornerDownRightIcon
                      aria-hidden
                      className="mt-px size-3.5 shrink-0"
                    />
                    <span>
                      <InlineMarkdown>{item.seeAlso}</InlineMarkdown>
                    </span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      );

    case "faq":
      return (
        <Accordion multiple>
          {block.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <Blocks blocks={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );

    case "figure":
      switch (block.figure) {
        case "campfire":
          return <CampfireFigure />;
        case "area-hints":
          return <AreaHintsFigure />;
        case "task-funnel":
          return <TaskFunnelFigure />;
        case "trial-rhythm":
          return <TrialRhythmFigure />;
      }

    case "signature":
      return (
        <p className="text-muted-foreground text-right">
          <span className="text-foreground font-semibold">
            {block.lines[0]}
          </span>
          {block.lines.slice(1).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}
