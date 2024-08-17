import calcTotalMonthHours from "@/lib/calcTotalMonthHours";
import ClientCalcSalaryModal from "./ClientCalcSalaryModal";
import { auth } from "@/auth";
import { getEmployee } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function CalcSalaryModal({
  userId,
  month,
}: {
  userId?: number;
  month?: number;
}) {
  let user = userId;
  if (!user) {
    const session = await auth();
    user = session!.user.userId;
  }
  const employee = await getEmployee(user);
  const totalHours = await calcTotalMonthHours(month, userId);
  return (
    <ClientCalcSalaryModal
      totalHours={totalHours}
      hourRate={employee?.hourlyRate || 0}
      username={employee!.name}
      admin={!!userId}
      month={month}
    />
  );
}
