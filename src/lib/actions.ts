"use server";

import { signIn } from "@/auth";

export async function signinAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    return "there is an error";
  }
}
