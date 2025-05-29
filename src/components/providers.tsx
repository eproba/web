"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NavigationGuardProvider } from "next-navigation-guard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavigationGuardProvider>
        <SessionProvider refetchInterval={60}>{children}</SessionProvider>
      </NavigationGuardProvider>
    </ThemeProvider>
  );
}
