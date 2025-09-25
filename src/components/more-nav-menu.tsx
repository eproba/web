"use client";

import { BugReportDialog } from "@/components/bug-report-dialog";
import { DrawerClose } from "@/components/ui/drawer";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type MoreNavItem = {
  title: string;
  href: string;
  external?: boolean;
  kind?: "bug-report";
};

type MoreNavMenuDesktopProps = {
  items: MoreNavItem[];
};

type MoreNavMenuMobileProps = {
  items: MoreNavItem[];
};

export function MoreNavMenuDesktop({ items }: MoreNavMenuDesktopProps) {
  const [isBugDialogOpen, setIsBugDialogOpen] = useState(false);

  return (
    <NavigationMenuItem>
      <BugReportDialog
        open={isBugDialogOpen}
        onOpenChange={setIsBugDialogOpen}
      />
      <NavigationMenuTrigger className="bg-transparent">
        Więcej
      </NavigationMenuTrigger>
      <NavigationMenuContent className="z-50 dark:bg-[#161b22]">
        <ul className="grid w-[240px] gap-1 p-2">
          {items.map((item) =>
            item.kind === "bug-report" ? (
              <NavigationMenuItem key="bug-report">
                <button
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full items-start justify-start bg-transparent text-start",
                  )}
                  onClick={() => setIsBugDialogOpen(true)}
                >
                  {item.title}
                </button>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full items-start bg-transparent",
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function MoreNavMenuMobile({ items }: MoreNavMenuMobileProps) {
  const [isBugDialogOpen, setIsBugDialogOpen] = useState(false);

  return (
    <>
      <BugReportDialog
        open={isBugDialogOpen}
        onOpenChange={setIsBugDialogOpen}
      />
      {items.map((item) =>
        item.kind === "bug-report" ? (
          <button
            className={cn(
              navigationMenuTriggerStyle(),
              "h-auto w-full justify-start py-1.5",
              isBugDialogOpen && "bg-accent text-accent-foreground",
            )}
            onClick={() => setIsBugDialogOpen(true)}
            key="bug-report"
          >
            {item.title}
          </button>
        ) : (
          <DrawerClose key={item.href} asChild>
            <Link
              href={item.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "h-auto w-full justify-start py-1.5",
              )}
              target={item.external ? "_blank" : undefined}
            >
              {item.title}
            </Link>
          </DrawerClose>
        ),
      )}
    </>
  );
}
