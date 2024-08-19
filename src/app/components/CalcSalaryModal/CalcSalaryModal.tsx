import calcTotalMonthHours from "@/lib/calcTotalMonthHours";
import ClientCalcSalaryModal from "./ClientCalcSalaryModal";
import { auth } from "@/auth";
import { getEmployee } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function CalcSalaryModal({
  userId,
  month,
}: {
  userId?: DbEmployeeUser["id"];
  month?: number;
}) {
  let user = userId;
  if (!user) {
    const session = await auth();
    user = session!.user.userId;
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
