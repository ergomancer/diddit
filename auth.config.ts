import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignedIn = !!auth?.user;
      const isInApp = !(
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/seed")
      );
      if (isInApp) {
        if (isSignedIn) {
          return true;
        }
        return false;
      } else if (isSignedIn) return Response.redirect(new URL("/", nextUrl));
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
