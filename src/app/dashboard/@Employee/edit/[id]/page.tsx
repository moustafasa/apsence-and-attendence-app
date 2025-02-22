import AttendenceForm from "@/app/components/Attendence/AttendenceForm";
import { getSingleAttendence } from "@/lib/controllers/attendenceController";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const dayIndex = +id;
  const attendence = await getSingleAttendence(dayIndex);

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
    />
  );
}
