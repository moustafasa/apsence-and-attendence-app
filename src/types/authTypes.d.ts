import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    userId: DbUser["id"];
    name: DbUser["name"];
    username: DbUser["username"];
    role: DbUser["role"];
  }
  interface Session {
    user: {
      userId: DbUser["id"];
      name: DbUser["name"];
      username: DbUser["username"];
      role: DbUser["role"];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: DbUser["id"];
    name: DbUser["name"];
    username: DbUser["username"];
    role: DbUser["role"];
  }
}
