"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

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
  /**
   * Whether the template is for an organization by default
   */
  templateForOrganization?: boolean;
}

export function CreateWorksheetButton({
  itemType = "worksheet",
  redirectTo,
  size = "default",
  children,
  parentClassName,
  templateForOrganization = false,
  ...props
}: CreateWorksheetButtonProps) {
  const pathname = usePathname();
  const href = `/worksheets/${itemType === "template" ? "templates/" : ""}/create?redirectTo=${redirectTo || pathname}${
    templateForOrganization ? "&forOrganization=true" : ""
  }`;

  const defaultContent = (
    <>
      <PlusIcon className="size-4" />
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
