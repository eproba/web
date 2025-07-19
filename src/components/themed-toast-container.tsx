"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "usehooks-ts";

export function ThemedToastContainer() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <ToastContainer
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      draggable
      stacked={!isMobile}
    />
  );
}
