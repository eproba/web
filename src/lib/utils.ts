import { PublicUser } from "@/types/user";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const displayNameFromUser = (
  user: Omit<PublicUser, "displayName">,
): string => {
  return [
    user.instructorRank.shortName || user.scoutRank.shortName,
    user.firstName,
    user.lastName,
    user.nickname && `„${user.nickname}”`,
    user.instructorRank.numberValue && user.scoutRank.shortName,
  ]
    .filter(Boolean)
    .join(" ");
};

export const capitalizeFirstLetter = (val: string): string => {
  return val.charAt(0).toUpperCase() + String(val).slice(1);
};

export function romanize(num: number): string {
  if (isNaN(num)) return "";
  const digits = String(+num).split("");
  const key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+(digits.pop() ?? 0) + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
