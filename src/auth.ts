import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { dbAuth } from "./lib/db";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials, request) {
        const user = await dbAuth(credentials as DbUser);
        console.log(user);

        if (user) {
          return {
            userId: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
});
