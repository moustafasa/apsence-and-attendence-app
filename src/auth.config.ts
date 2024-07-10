import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async authorized({ request, auth }) {
      if (!auth?.user) return false;
      return true;
    },
  },
} satisfies NextAuthConfig;
