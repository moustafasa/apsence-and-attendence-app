import ClientCalcSalaryModal from "./ClientCalcSalaryModal";
import { auth } from "@/auth";
import { Suspense } from "react";
import { getEmployee } from "@/lib/controllers/employeesController";
import { calcTotalMonthHours } from "@/lib/controllers/attendenceController";

export default async function CalcSalaryModal({
  userId,
  month,
}: {
  userId?: IUser["_id"];
  month?: number;
}) {
  let user = userId;
  if (!user) {
    const session = await auth();
    user = session!.user.userId as string;
  }
  const employee = await getEmployee(user);

  if (!employee) return null;

  const totalHours = await calcTotalMonthHours(month, userId);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ClientCalcSalaryModal
        totalHours={totalHours}
        employee={employee}
        admin={!!userId}
      />
    </Suspense>
  );
}
