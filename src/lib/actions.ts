"use server";

import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { editEmployee, setAttandence, addEmployee } from "./db";
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

  console.log(session.user);
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
    const [endHours, endMinutes] = (formData.get("end") as string)
      .split(":")
      .map((time) => Number(time));

    //convert endHours and endMinutes into date Object
    endDate = new Date(day);
    if (endHours < 5) {
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);

    if (endDate.getTime() <= startDate.getTime()) {
      return "the end date must be greater than the start date";
    }
  }

  await setAttandence(startDate, endDate);
  revalidatePath("/dashboard/");
  redirect("/dashboard/");
}

export async function editEmployeeAction(
  id: number,
  prevState: string | undefined,
  formData: FormData
) {
  const hourlyRate = formData.get("hourlyRate");
  if (hourlyRate) {
    editEmployee(id, +hourlyRate);
    revalidatePath("/dashboard");
    return redirect("/dashboard");
  }
}

export async function addEmployeeAction(
  prevState: string | undefined,
  formData: FormData
) {
  const employee = Object.fromEntries(formData) as {
    name: string;
    username: string;
    password: string;
    hourlyRate: string;
  };

  await addEmployee({ ...employee, hourlyRate: +employee.hourlyRate });

  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
