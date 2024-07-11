import { NextAuthConfig } from "next-auth";

export enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    redirect({ baseUrl }) {
      return baseUrl + "/dashboard";
    },
    session({ session, token }) {
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
    async authorized({ request, auth }) {
      if (request.nextUrl.pathname !== "/") {
        if (!auth?.user) return false;
        if (auth?.user && request.nextUrl.pathname === "/login") {
          return Response.redirect(new URL("/dashboard", request.url));
        }
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
