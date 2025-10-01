"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const basePath = `/worksheets${itemType === "template" ? "/templates" : ""}/create`;

  const params = new URLSearchParams();
  const targetRedirect = redirectTo ?? pathname;
  if (targetRedirect) params.set("redirectTo", targetRedirect);
  if (templateForOrganization) params.set("forOrganization", "true");
  if (userId) params.set("defaultUserId", userId);

  const href = params.toString()
    ? `${basePath}?${params.toString()}`
    : basePath;

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
