import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PublicUser } from "@/types/user";

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
    user.instructorRank.value && user.scoutRank.shortName,
  ]
    .filter(Boolean)
    .join(" ");
};
