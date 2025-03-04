import { Role } from "@/types/Enums";
import dbConnect from "../config/dbConnect";
import { hashPassword } from "../lib/controllers/authController";
import { getDb } from "./db";
import Users from "../models/Users";

export async function seedUsers() {
  await dbConnect();
  const users = (await getDb()).data.users;
  users.forEach(async (user) => {
    await Users.create({
      ...user,
      password: await hashPassword(user.password),
    });
  });
}
