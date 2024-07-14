import NextAuth from "next-auth";
import { authConfig, Role } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { getDb } from "./lib/db";

const users = [
  {
    name: "dr-moustafa",
    username: "moustafa",
    password: "123456",
    role: Role.EMPLOYEE,
  },
  {
    name: "dr-menna",
    username: "menna",
    password: "123456",
    role: Role.EMPLOYEE,
  },
  {
    name: "dr-adel",
    username: "adel",
    password: "123456",
    role: Role.ADMIN,
  },
];

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials, request) {
        const test = await getDb();
        console.log(test);
        const user = users.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        console.log(user);

        if (user) {
          return {
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
