import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { dbAuth } from "./lib/controllers/authController";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const auth = await dbAuth(
          credentials.username as string,
          credentials.password as string
        );
        return auth;
      },
    }),
  ],
});
