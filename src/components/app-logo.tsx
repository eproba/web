"use client";

import { useTheme } from "next-themes";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import LightThemeLogo from "@/../public/logo-dark.svg";
import DarkThemeLogo from "@/../public/logo.svg";

const getSource = (theme: string | undefined): StaticImageData => {
  if (theme === "dark") {
    return DarkThemeLogo as StaticImageData;
  }
  return LightThemeLogo as StaticImageData;
};

export function AppLogo({
  forceTheme,
}: { forceTheme?: "dark" | "light" } = {}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Link href="/" className="text-lg font-bold">
      <Image
        src={forceTheme ? getSource(forceTheme) : getSource(resolvedTheme)}
        alt="Epróba"
        className="w-[112px] mb-1"
      />
      <span className="absolute translate-x-16 -translate-y-6 -rotate-30 text-green-500 pointer-events-none bg-accent/50">
        v2 βeta
      </span>
    </Link>
  ) : (
    <div className="h-[32px] w-[112px]"></div>
  );
}
