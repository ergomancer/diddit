import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("Authorizing");
      console.log("nextUrl", nextUrl.href);
      const isSignedIn = !!auth?.user;
      console.log("Sign-in status", isSignedIn);
      const isInApp = !(
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/seed")
      );
      console.log("Is in app?", isInApp);
      if (isInApp) {
        if (isSignedIn) {
          console.log("All checks passed");
          return true;
        }
        console.log("Needs to be signed in");
        return false;
      } else if (isSignedIn) return Response.redirect(new URL("/", nextUrl));
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
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
