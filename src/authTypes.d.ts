import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    userId: number;
    name: string;
    username: string;
    role: Role;
  }
  interface Session {
    user: {
      userId: number;
      name: string;
      username: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    role: Role;
    username: string;
    name: string;
  }
}
export enum Role {
  ADMIN = 0,
  EMPLOYEE = 1,
}
