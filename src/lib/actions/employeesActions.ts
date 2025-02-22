"use server";
import { revalidatePath } from "next/cache";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
} from "../controllers/employeesController";
import { redirect } from "next/navigation";

export async function editEmployeeAction(
  id: DbEmployeeUser["id"],
  prevState: string | undefined,
  formData: FormData
) {
  const hourlyRate = formData.get("hourlyRate");
  if (hourlyRate) {
    await editEmployee(id, +hourlyRate);
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

export async function deleteEmployeeAction(id: DbEmployeeUser["id"]) {
  await deleteEmployee(id);
  revalidatePath("/dashboard/");
}
