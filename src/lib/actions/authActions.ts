"use server";
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
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
    if (error instanceof CredentialsSignin) {
      return "Invalid credentials";
    }
    return "unknown error";
  }
}

export async function signOutAction() {
  await signOut();
}
