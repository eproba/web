import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PublicUser } from "@/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const displayNameFromUser = (
  user: Omit<PublicUser, "displayName">,
): string => {
  if (user.nickname) {
    return user.nickname;
  }
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  return "Nieznany użytkownik";
};
