"use client";

import { setCurrentUserAtom } from "@/state/user";
import { User } from "@/types/user";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

/**
 * Hydrates the global current user atom once per app load with the server-fetched user.
 */
export function UserHydrator({ user }: { user?: User }) {
  const setCurrentUser = useSetAtom(setCurrentUserAtom);

  useEffect(() => {
    // undefined -> means not loaded; null -> means unauthenticated
    setCurrentUser(user ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
