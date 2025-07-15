"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider refetchInterval={60} basePath="/auth">
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
