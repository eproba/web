"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavChapter, NavLink } from "@/lib/vademecum/navigation";
import { DownloadIcon, ListIcon, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { VademecumNav } from "./vademecum-nav";
import { VademecumSearch } from "./vademecum-search";

/** Table of contents in a side sheet, for screens without the sidebar. */
export function VademecumMobileNav({
  start,
  chapters,
  pdfUrl,
}: {
  start: NavLink;
  chapters: NavChapter[];
  pdfUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = [start, ...chapters.flatMap((chapter) => chapter.links)].find(
    (link) => link.href === pathname,
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="outline" className="w-full justify-start" />}
      >
        <ListIcon />
        <span className="truncate">{current?.title ?? "Spis treści"}</span>
        <SearchIcon className="text-muted-foreground ml-auto" />
      </SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader>
          <SheetTitle>Vademecum</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <VademecumSearch onNavigate={() => setOpen(false)}>
            <VademecumNav
              start={start}
              chapters={chapters}
              onNavigate={() => setOpen(false)}
            />
          </VademecumSearch>
        </div>
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full"
            nativeButton={false}
            render={<a href={pdfUrl} target="_blank" rel="noopener" />}
          >
            <DownloadIcon />
            Pobierz PDF
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
