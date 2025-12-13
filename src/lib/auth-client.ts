import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  basePath: "/auth",
  plugins: [genericOAuthClient()],
});

// Export commonly used functions for convenience
export const {
  signIn,
  signOut,
  useSession,
  getSession,
} = authClient;
