import AttendenceForm from "@/app/components/AttendenceForm";
import { getSingleAttendence } from "@/lib/db";
import formatTime from "@/lib/formatTime";
import getTodayDate from "@/lib/getTodayDate";

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const attendence = await getSingleAttendence(+id);

  if (!attendence) {
    const date = getTodayDate();
    date.setDate(+id);
    return <AttendenceForm date={date} />;
  }
  const startDate = new Date(attendence.startDate);
  const endDate = new Date(attendence.endDate);

  return (
    <AttendenceForm
      date={startDate}
      startTime={formatTime(startDate)}
      endTime={formatTime(endDate)}
    />
  );
}
