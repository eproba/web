import NextAuth, { DefaultSession } from "next-auth";
import { Gender, User } from "@/types/user";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "eproba",
      name: "Epróba",
      type: "oidc",
      issuer: `${process.env.NEXT_PUBLIC_API_URL}/oauth2`,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      authorization: {
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
    jwt({ token, user, account }) {
      if (user) {
        // User is available during sign-in
        return { ...token, ...user, accessToken: account?.access_token };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.sub,
          nickname: token.nickname,
          firstName: token.given_name,
          lastName: token.family_name,
          name: token.name,
          email: token.email,
          emailVerified: token.email_verified,
          gender: Object.values(Gender).includes(token.gender as Gender)
            ? (token.gender as Gender)
            : null,
          patrol: token.patrol,
          rank: token.rank,
          scoutRank: token.scout_rank,
          instructorRank: token.instructor_rank,
          function: token.function,
          isActive: token.is_active,
          isStaff: token.is_staff,
          isSuperuser: token.is_superuser,
        },
      };
    },
  },
});
