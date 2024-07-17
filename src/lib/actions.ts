"use server";

import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { setAttandence } from "./db";
import { revalidatePath } from "next/cache";

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

export async function setAttandenceAction(formData: FormData) {
  const session = await auth();
  if (session?.user) {
    const [startHours, startMinutes] = (formData.get("start") as string)
      .split(":")
      .map((time) => Number(time));
    const [endHours, endMinutes] = (formData.get("end") as string)
      .split(":")
      .map((time) => Number(time));

    const startDate = new Date(formData.get("day") as string);
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    const endDate = new Date(formData.get("day") as string);
    if (endHours < 5) {
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);

    console.log(endDate.toString());

    await setAttandence(startDate, endDate, session.user.userId);
    revalidatePath("/dashboard/");
    return;
  }
}
