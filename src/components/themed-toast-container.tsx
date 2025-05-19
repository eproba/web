"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export function ThemedToastContainer() {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      draggable
      stacked
    />
  );
}
