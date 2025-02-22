import { cache } from "react";
import { hashPassword } from "./authController";
import dbConnect from "@/config/dbConnect";
import Users from "@/models/Users";
import { HydratedDocument } from "mongoose";
import { Role } from "@/types/Enums";

export const getEmployees = cache(async () => {
  await dbConnect();
  const users = await Users.find({
    role: Role.EMPLOYEE,
  })
    .lean<IUser[]>()
    .exec();
  return users.map((user) => {
    const { password, _id, ...rest } = user;
    return { ...rest, _id: _id.toString() };
  });
});

export const getServerUser = cache(async (id: IUser["_id"]) => {
  await dbConnect();
  const user = await Users.findOne<HydratedDocument<IUser>>({ _id: id }).exec();
  return user;
});

export const getEmployee = cache(async (id: IUser["_id"]) => {
  const user = await getServerUser(id);
  if (!user) return null;
  return {
    name: user.name,
    username: user.username,
    hourlyRate: user.hourlyRate,
    _id: user._id.toString(),
  };
});

export const editEmployee = cache(
  async (id: IUser["_id"], hourlyRate: number) => {
    await dbConnect();
    const user = await getServerUser(id);
    if (!user) return;
    user.hourlyRate = hourlyRate;
    await user?.save();
  }
);

export const addEmployee = cache(
  async (employee: {
    name: string;
    username: string;
    password: string;
    hourlyRate: number;
  }) => {
    const hashedPass = await hashPassword(employee.password);
    await dbConnect();
    const foundUser = await Users.findOne({ username: employee.username });
    if (foundUser) {
      throw new Error("Username already exists");
    }
    await Users.create({
      name: employee.name,
      username: employee.username,
      password: hashedPass,
      hourlyRate: employee.hourlyRate,
    });
  }
);

export const deleteEmployee = cache(async (id: IUser["_id"]) => {
  await dbConnect();
  await Users.deleteOne({ _id: id }).exec();
});
