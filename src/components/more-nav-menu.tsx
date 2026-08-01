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
      <NavigationMenuContent>
        <ul className="grid w-50">
          {items.map((item) =>
            item.kind === "bug-report" ? (
              <li key="bug-report">
                <NavigationMenuLink
                  render={<button />}
                  onClick={() => setIsBugDialogOpen(true)}
                  className="w-full"
                >
                  {item.title}
                </NavigationMenuLink>
              </li>
            ) : (
              <li key={item.href}>
                <NavigationMenuLink
                  closeOnClick
                  render={
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                    />
                  }
                >
                  {item.title}
                </NavigationMenuLink>
              </li>
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
          <DrawerClose
            key={item.href}
            nativeButton={false}
            render={
              <Link
                href={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-auto w-full justify-start py-1.5",
                )}
                target={item.external ? "_blank" : undefined}
              />
            }
          >
            {item.title}
          </DrawerClose>
        ),
      )}
    </>
  );
}
