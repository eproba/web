"use client";

import { cn } from "@/lib/utils";
import type { NavChapter, NavLink } from "@/lib/vademecum/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageIcon } from "./page-icon";

function NavItem({
  link,
  number,
  active,
  onNavigate,
}: {
  link: NavLink;
  /** Chapter number shown instead of the icon. */
  number?: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "hover:bg-muted flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {number ? (
        <span className="w-4 shrink-0 text-xs tabular-nums">{number}</span>
      ) : (
        link.icon && <PageIcon name={link.icon} className="size-4 shrink-0" />
      )}
      <span className="truncate">{link.title}</span>
    </Link>
  );
}

/** Table of contents of the whole Vademecum. */
export function VademecumNav({
  start,
  chapters,
  onNavigate,
}: {
  start: NavLink;
  chapters: NavChapter[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Spis treści Vademecum" className="space-y-1">
      <NavItem
        link={start}
        active={pathname === start.href}
        onNavigate={onNavigate}
      />
      {chapters.map((chapter) =>
        chapter.links.length === 1 ? (
          <NavItem
            key={chapter.number}
            link={chapter.links[0]}
            number={chapter.number}
            active={pathname === chapter.links[0].href}
            onNavigate={onNavigate}
          />
        ) : (
          <div key={chapter.number} className="space-y-1 pt-3">
            <p className="text-muted-foreground flex gap-2 px-2 text-xs font-medium">
              <span className="tabular-nums">{chapter.number}</span>
              <span>{chapter.title}</span>
            </p>
            <div className="ml-4 space-y-1 border-l pl-2">
              {chapter.links.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  active={pathname === link.href}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ),
      )}
    </nav>
  );
}
