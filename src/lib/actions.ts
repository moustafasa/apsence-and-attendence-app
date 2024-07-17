"use server";

import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { setAttandence } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signinAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return "there is an error";
  }
}

export async function signOutAction() {
  await signOut();
}

export async function setAttandenceAction(
  prevState: string | undefined,
  formData: FormData
) {
  const session = await auth();
  if (!formData.get("start") || !formData.get("end")) {
    return "please add a valid date in the start date and the end date";
  }
  if (!session?.user) {
    return "you must logged in";
  }

  // get startHours and startMinutes
  const [startHours, startMinutes] = (formData.get("start") as string)
    .split(":")
    .map((time) => Number(time));

  // get EndHours and EndMinutes
  const [endHours, endMinutes] = (formData.get("end") as string)
    .split(":")
    .map((time) => Number(time));

  //convert startHours and startMinutes into date Object
  const startDate = new Date(formData.get("day") as string);
  startDate.setHours(startHours);
  startDate.setMinutes(startMinutes);

  //convert endHours and endMinutes into date Object
  const endDate = new Date(formData.get("day") as string);
  if (endHours < 5) {
    endDate.setDate(endDate.getDate() + 1);
  }
  endDate.setHours(endHours);
  endDate.setMinutes(endMinutes);

  if (endDate.getTime() <= startDate.getTime()) {
    return "the end date must be greater than the start date";
  }

  await setAttandence(startDate, endDate, session.user.userId);
  revalidatePath("/dashboard/");
  redirect("/dashboard/");
}
