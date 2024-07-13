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
