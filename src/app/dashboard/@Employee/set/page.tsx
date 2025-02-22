import AttendenceForm from "@/app/components/Attendence/AttendenceForm";
import { getSingleAttendence } from "@/lib/controllers/attendenceController";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import { FaCheck } from "react-icons/fa";

export default async function Page() {
  const todayDate = getDayDate();
  const att = await getSingleAttendence(todayDate.getDate());

  if (att.completed)
    return (
      <div className="w-full h-full flex items-center justify-center capitalize text-4xl font-bold flex-col gap-4">
        you paid this month please wait untill new month
        <FaCheck className="text-green-500" />
      </div>
    );

  return (
    <AttendenceForm
      date={todayDate}
      startTime={
        att?.days?.startDate
          ? formatTime(new Date(att.days.startDate), false)
          : undefined
      }
      endTime={att?.days?.endDate ? new Date(att.days.endDate) : undefined}
    />
  );
}
