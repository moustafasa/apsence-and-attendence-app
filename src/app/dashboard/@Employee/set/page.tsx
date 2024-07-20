import AttendenceForm from "@/app/components/AttendenceForm";
import { getSingleAttendence } from "@/lib/db";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";

export default async function Page() {
  const todayDate = getDayDate();
  const att = await getSingleAttendence(todayDate.getDate());

  return (
    <AttendenceForm
      date={todayDate}
      startTime={
        att?.startDate ? formatTime(new Date(att.startDate), false) : undefined
      }
      endTime={
        att?.endDate ? formatTime(new Date(att.endDate), false) : undefined
      }
    />
  );
}
