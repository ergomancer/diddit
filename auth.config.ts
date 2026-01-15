import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignedIn = !!auth?.user;
      const isInApp = !(
        nextUrl.pathname.startsWith("/signin") ||
        nextUrl.pathname.startsWith("/seed")
      );
      if (isInApp) {
        if (isSignedIn) return true;
        return false;
      } else if (isSignedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
