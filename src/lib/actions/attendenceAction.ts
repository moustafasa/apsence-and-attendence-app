"use server";
import { revalidatePath } from "next/cache";
import {
  getMonthPaid,
  setAttandence,
} from "../controllers/attendenceController";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getDayDate from "../getDayDate";

export async function setAttandenceAction(
  day: Date,
  prevState: string | undefined,
  formData: FormData
) {
  const session = await auth();
  if (!formData.get("start")) {
    return "please add a valid date in the start date and the end date";
  }
  if (!session?.user) {
    return "you must logged in";
  }

  // get startHours and startMinutes
  const [startHours, startMinutes] = (formData.get("start") as string)
    .split(":")
    .map((time) => Number(time));

  //convert startHours and startMinutes into date Object
  const startDate = new Date(day);
  startDate.setHours(startHours);
  startDate.setMinutes(startMinutes);

  let endDate: Date | undefined;

  if (formData.get("end")) {
    // get EndHours and EndMinutes
    endDate = new Date(formData.get("end") as string);

    if (endDate.getTime() <= startDate.getTime()) {
      return "the end date must be greater than the start date";
    }
  }

  await setAttandence(startDate, endDate);
  revalidatePath("/dashboard/");
  redirect("/dashboard/");
}

export async function getPaidAction(
  userId: IUser["_id"],
  salary: number,
  month?: number
) {
  let mon = month;
  if (mon === undefined) {
    const todayDate = getDayDate();
    mon = todayDate.getMonth();
  }
  await getMonthPaid(mon, userId, salary);
  revalidatePath(`dashboard/view/${userId}`);
}
