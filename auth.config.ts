import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignedIn = !!auth?.user;
      const isInApp = nextUrl.pathname.startsWith("/app");
      if (isInApp) {
        if (isSignedIn) {
          return true;
        }
        return false;
      } else if (isSignedIn) return Response.redirect(new URL("/app", nextUrl));
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
