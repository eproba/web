"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/** "Na tej stronie" list that highlights the section being read. */
export function TableOfContents({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // the lowest section that reaches into the top third of the screen
        const current = items.findLast((item) => visible.has(item.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Na tej stronie" className="space-y-2 text-sm">
      <p className="font-medium">Na tej stronie</p>
      <ul className="space-y-1 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 pl-3",
                activeId === item.id
                  ? "border-foreground text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
