import { Role } from "@/auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    name: string;
    username: string;
    role: Role;
  }
  interface Session {
    user: {
      name: string;
      username: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    username: string;
    name: string;
  }
}
