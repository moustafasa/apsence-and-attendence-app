"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

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

export async function setAttandence(formData: FormData) {
  const [startHours, startMinutes] = (formData.get("start") as string).split(
    ":"
  );
  const [endHours, endMinutes] = (formData.get("end") as string).split(":");
  const startDate = new Date(formData.get("day") as string);
  startDate.setHours(Number(startHours));
  startDate.setMinutes(Number(startMinutes));

  const endDate = new Date(formData.get("day") as string);
  if (Number(endHours) > 12) {
    endDate.setDate(endDate.getDate() + 1);
  }
  endDate.setHours(Number(endHours));
  endDate.setMinutes(Number(endMinutes));
  console.log(startDate.getDate(), endDate.getDate());
}
