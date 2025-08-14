"use client";

import { type User } from "@/types/user";
import { type Getter, type Setter, atom, useAtomValue } from "jotai";

// Holds the current authenticated user (undefined when not fetched, null when no user)
export const currentUserAtom = atom<User | null | undefined>(undefined);

// Derived helpers
export const isUserLoadedAtom = atom(
  (get: Getter) => get(currentUserAtom) !== undefined,
);
export const isAuthenticatedAtom = atom(
  (get: Getter) => !!get(currentUserAtom),
);

// Actions
export const setCurrentUserAtom = atom(
  null,
  (_get: Getter, set: Setter, user: User | null | undefined) => {
    set(currentUserAtom, user);
  },
);

// Convenience hook (client-only)
export function useCurrentUser() {
  return useAtomValue(currentUserAtom);
}
