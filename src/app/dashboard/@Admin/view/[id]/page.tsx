import { getEmployee } from "@/lib/controllers/employeesController";
import { getUserMonthsMetaData } from "@/lib/controllers/attendenceController";
import { notFound } from "next/navigation";
import AttendanceTable from "@/app/components/Attendence/AttendanceTable";

type Props = {
  searchParams: { show?: string; month?: string };
  params: { id: string };
};

export default async function page({ searchParams, params: { id } }: Props) {
  const monthMeta = await getUserMonthsMetaData(id);
  const employee = await getEmployee(id);

  if (!employee) {
    notFound();
  }

  return (
    <AttendanceTable
      searchParams={searchParams}
      monthMeta={monthMeta}
      userId={id}
      userName={employee.name}
      isAdmin={true}
    />
  );
}
