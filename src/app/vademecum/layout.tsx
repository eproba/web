import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VademecumMobileNav } from "@/components/vademecum/vademecum-mobile-nav";
import { VademecumNav } from "@/components/vademecum/vademecum-nav";
import { VademecumSearch } from "@/components/vademecum/vademecum-search";
import { cn } from "@/lib/utils";
import { PDF_URL, getNavigation } from "@/lib/vademecum/navigation";
import { DownloadIcon } from "lucide-react";

/**
 * Sticky sidebar that always fits on the screen. Two scroll-driven animations
 * (keyframes in globals.css) shorten it: by 84px at the very top of the page,
 * where the navbar is above it, and by 41px at the very end, where the footer
 * comes into view. Browsers without scroll-driven animations skip both.
 */
const SIDEBAR_CARD = cn(
  "max-h-[calc(100dvh-2rem-var(--vademecum-sidebar-top)-var(--vademecum-sidebar-end))] gap-0 py-0 shadow-none",
  "supports-[animation-timeline:scroll()]:[animation-name:vademecum-sidebar-top,vademecum-sidebar-end]",
  "supports-[animation-timeline:scroll()]:[animation-timing-function:linear]",
  "supports-[animation-timeline:scroll()]:[animation-fill-mode:both]",
  "supports-[animation-timeline:scroll()]:[animation-timeline:scroll(root),scroll(root)]",
  "supports-[animation-timeline:scroll()]:[animation-range:0_84px,calc(100%_-_41px)_100%]",
);

export default function VademecumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { start, chapters } = getNavigation();

  return (
    <div className="grid items-start gap-8 lg:-mb-24 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="sticky top-4 hidden lg:block">
        <Card size="sm" className={SIDEBAR_CARD}>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <VademecumSearch>
              <VademecumNav start={start} chapters={chapters} />
            </VademecumSearch>
          </div>
          <div className="border-t p-3">
            <Button
              variant="ghost"
              className="text-muted-foreground w-full justify-start"
              nativeButton={false}
              render={<a href={PDF_URL} target="_blank" rel="noopener" />}
            >
              <DownloadIcon />
              Pobierz PDF
            </Button>
          </div>
        </Card>
      </aside>

      {/* the padding (offset by the grid's negative margin) lets the sticky
          sidebar stay in place down to the footer */}
      <div className="min-w-0 lg:pb-24">
        <div className="mb-6 lg:hidden">
          <VademecumMobileNav
            start={start}
            chapters={chapters}
            pdfUrl={PDF_URL}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
