import { Card } from "@/components/ui/card";
import { AREAS } from "@/lib/vademecum/content";
import { pageHref } from "@/lib/vademecum/navigation";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { PageIcon } from "./page-icon";

/** List of the areas of life, shown on the "Drogowskazy" page. */
export function AreaGrid() {
  return (
    <section aria-labelledby="areas" className="space-y-3">
      <h2 id="areas" className="text-xl font-semibold">
        Obszary życia
      </h2>
      <Card className="gap-0 py-0">
        <ul className="divide-y">
          {AREAS.map((area) => (
            <li key={area.slug}>
              <Link
                href={pageHref(area)}
                className="hover:bg-muted/50 flex items-center gap-4 px-6 py-4"
              >
                {area.icon && (
                  <PageIcon
                    name={area.icon}
                    className="text-muted-foreground size-5 shrink-0"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{area.title}</span>
                  <span className="text-muted-foreground block text-sm">
                    {area.description}
                  </span>
                </span>
                <ChevronRightIcon className="text-muted-foreground size-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
