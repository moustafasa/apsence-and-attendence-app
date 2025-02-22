import dbConnect from "@/config/dbConnect";
import Users from "@/models/Users";
import { cache } from "react";
import bcrypt from "bcryptjs";
import { HydratedDocument } from "mongoose";

const comparePasswords = async (hashedPass: string, passToCompare: string) => {
  return await bcrypt.compare(passToCompare, hashedPass);
};

export const hashPassword = async (pass: string) => {
  const hashPass = await bcrypt.hash(pass, 10);
  return hashPass;
};

export const dbAuth = async (username: string, password: string) => {
  await dbConnect();

  const userFound: HydratedDocument<IUser> = await Users.findOne({
    username,
  }).exec();

  if (!userFound) return null;
  const isMatch = await comparePasswords(
    userFound.password as string,
    password
  );

  if (!isMatch) return null;

  return {
    username: userFound.username,
    name: userFound.name,
    userId: userFound._id,
    role: userFound.role,
  };
};
