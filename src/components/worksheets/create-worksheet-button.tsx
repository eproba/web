"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { usePathname } from "next/navigation";

interface CreateWorksheetButtonProps
  extends Omit<React.ComponentProps<"button">, "type">,
    VariantProps<typeof buttonVariants> {
  /**
   * The type of item to create
   */
  itemType?: "worksheet" | "template";
  /**
   * The URL to redirect to after creation
   */
  redirectTo?: string;
  /**
   * The class name for the parent element
   */
  parentClassName?: string;
}

export function CreateWorksheetButton({
  itemType = "worksheet",
  redirectTo,
  size = "default",
  children,
  parentClassName,
  ...props
}: CreateWorksheetButtonProps) {
  const pathname = usePathname();
  const href = `/worksheets/${itemType === "template" ? "templates/" : ""}/create?redirectTo=${redirectTo || pathname}`;

  const defaultContent = (
    <>
      <PlusIcon className="w-4 h-4" />
      {size !== "icon" &&
        (itemType === "template" ? "Utwórz szablon" : "Utwórz próbę")}
    </>
  );

  return (
    <Link href={href} className={parentClassName}>
      <Button size={size} {...props}>
        {children || defaultContent}
      </Button>
    </Link>
  );
}
