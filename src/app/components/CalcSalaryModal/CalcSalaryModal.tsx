import calcTotalMonthHours from "@/lib/calcTotalMonthHours";
import ClientCalcSalaryModal from "./ClientCalcSalaryModal";
import { auth } from "@/auth";
import { getEmployee } from "@/lib/db";

export default async function CalcSalaryModal() {
  const session = await auth();
  if (session?.user) {
    const employee = await getEmployee(session.user.userId);
    const totalHours = await calcTotalMonthHours();
    return (
      <ClientCalcSalaryModal
        totalHours={totalHours}
        hourRate={employee?.hourlyRate || 0}
        username={session.user.name}
      />
    );
  }
  return null;
}
