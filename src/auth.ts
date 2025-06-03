import NextAuth from "next-auth";
import { userSerializer } from "@/lib/serializers/user";

/* eslint-disable @typescript-eslint/no-explicit-any */

const refreshTokenPromises = new Map<string, Promise<any>>();

declare module "next-auth" {
  interface Session {
    accessToken: string;
    error?: "RefreshTokenError";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "eproba",
      name: "Epróba",
      type: "oidc",
      issuer: `${process.env.INTERNAL_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}/oauth2`,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      authorization: {
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorize`,
        params: {
          scope: "openid profile email",
        },
      },
      async profile(profile) {
        return profile;
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        // First sign in
        return {
          ...token,
          ...user,
          accessToken: account.access_token,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else if (
        typeof token.expiresAt === "number" &&
        Date.now() < token.expiresAt * 1000 - 5 * 1000 // 5 seconds buffer expiresAt
      ) {
        return token;
      } else {
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");
        const userId = token.sub;
        if (!userId) throw new TypeError("Missing user ID");

        // Check for existing refresh promise
        let refreshPromise = refreshTokenPromises.get(userId);
        if (!refreshPromise) {
          refreshPromise = (async () => {
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/token/`,
                {
                  method: "POST",
                  body: new URLSearchParams({
                    client_id: process.env.AUTH_CLIENT_ID!,
                    client_secret: process.env.AUTH_CLIENT_SECRET!,
                    grant_type: "refresh_token",
                    refresh_token: token.refreshToken as string,
                  }),
                },
              );

              const tokensOrError = await response.json();
              if (!response.ok) throw tokensOrError;

              return {
                ...token,
                accessToken: tokensOrError.access_token,
                expiresAt: Math.floor(
                  Date.now() / 1000 + tokensOrError.expires_in,
                ),
                refreshToken: tokensOrError.refresh_token,
              };
            } catch (error) {
              console.error("Error refreshing access_token", error);
              return { ...token, error: "RefreshTokenError" };
            } finally {
              refreshTokenPromises.delete(userId);
            }
          })();

          refreshTokenPromises.set(userId, refreshPromise);
        }

        return await refreshPromise;
      }
    },
    session({ session, token }) {
      if (token.error) {
        return { ...session, user: undefined };
      }
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          ...userSerializer({ ...token, id: token.sub as string } as any),
        },
      };
    },
  },
});
