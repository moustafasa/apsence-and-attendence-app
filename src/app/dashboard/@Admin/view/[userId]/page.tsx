import {
  getEmployee,
  getEmployees,
} from "@/lib/controllers/employeesController";
import { getUserMonthsMetaData } from "@/lib/controllers/attendenceController";
import { notFound } from "next/navigation";
import AttendanceTable from "@/app/components/Attendence/AttendanceTable";
import ViewSkeleton from "@/app/components/skeleton/ViewSkeleton";

type Props = {
  searchParams: { show?: string; month?: string };
  params: { userId: string };
};

export default async function page({
  searchParams,
  params: { userId },
}: Props) {
  const monthMeta = await getUserMonthsMetaData(userId);
  const employee = await getEmployee(userId);

  if (!employee) {
    notFound();
  }

  return (
    <AttendanceTable
      searchParams={searchParams}
      monthMeta={monthMeta}
      userId={userId}
      userName={employee.name}
      isAdmin={true}
    />
  );
}

export async function generateStaticParams() {
  const employees = await getEmployees();
  return employees.map((emp) => ({ params: { userId: emp._id.toString() } }));
}
