import Attendence from "@/models/Attendence";
import dbConnect from "../config/dbConnect";
import { getDb } from "../models/db";
import { HydratedDocument } from "mongoose";
import { auth } from "@/auth";

export async function seedAttendence() {
  await dbConnect();
  const att = (await getDb()).data.attendence;
  const session = await auth();
  if (!session?.user) return;
  Object.keys(att).forEach(async (key) => {
    att[key].forEach(async (att) => {
      await Attendence.create<HydratedDocument<IMonthAttendence>>({
        monthIndex: parseInt(key),
        userId: session.user.userId,
        days: att.days.map((day) => ({
          dayIndex: new Date(day.startDate).getDate(),
          startDate: new Date(day.startDate),
          endDate: new Date(day.endDate),
        })),
      });
    });
  });
}
