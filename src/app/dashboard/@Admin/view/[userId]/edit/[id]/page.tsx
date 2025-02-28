import AttendenceForm from "@/app/components/Attendence/AttendenceForm";
import { getSingleAttendence } from "@/lib/controllers/attendenceController";
import { getEmployees } from "@/lib/controllers/employeesController";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import { notFound } from "next/navigation";

type Props = { params: { id: string; userId: string } };

export default async function Page({ params: { id, userId } }: Props) {
  const dayIndex = +id;
  const attendence = await getSingleAttendence(dayIndex, userId);

  if (attendence.completed) return notFound();

  let startDate: Date | undefined, endDate: Date | undefined;

  if (attendence.days) {
    startDate = new Date(attendence.days.startDate);
    endDate = attendence.days.endDate
      ? new Date(attendence.days.endDate)
      : undefined;
  }

  return (
    <AttendenceForm
      date={startDate || getDayDate(dayIndex)}
      startTime={startDate ? formatTime(startDate, false) : undefined}
      endTime={endDate}
      userId={userId}
    />
  );
}

export async function generateStaticParams() {
  const employees = await getEmployees();
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  return employees.flatMap((emp) =>
    days.map((day) => ({
      userId: emp._id.toString(),
      id: day,
    }))
  );
}
