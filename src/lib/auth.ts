import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/auth",
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "eproba",
          discoveryUrl: `${process.env.INTERNAL_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/.well-known/openid-configuration`,
          clientId: process.env.AUTH_CLIENT_ID!,
          clientSecret: process.env.AUTH_CLIENT_SECRET!,
          scopes: ["openid", "profile", "email", "teams", "worksheets"],
          pkce: true,
          authorizationUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorize`,
        },
      ],
    }),
  ],
});

// Export types for session
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
