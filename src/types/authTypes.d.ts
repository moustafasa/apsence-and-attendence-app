import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    userId: IUser["id"];
    name: IUser["name"];
    username: IUser["username"];
    role: IUser["role"];
  }
  interface Session {
    user: {
      userId: IUser["id"];
      name: IUser["name"];
      username: IUser["username"];
      role: IUser["role"];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: IUser["id"];
    name: IUser["name"];
    username: IUser["username"];
    role: IUser["role"];
  }
}
