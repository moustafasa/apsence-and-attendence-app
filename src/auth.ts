import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";

export enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}

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
        const user = users.find(
          (user) =>
            user.username === credentials.email &&
            user.password === credentials.password
        );

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
