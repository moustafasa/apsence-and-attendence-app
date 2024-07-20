import AttendenceForm from "@/app/components/AttendenceForm";
import { getSingleAttendence } from "@/lib/db";
import formatTime from "@/lib/formatTime";
import getDateOfDay from "@/lib/getDateOfDay";

type Props = { params: { id: string } };

export default async function Page({ params: { id } }: Props) {
  const attendence = await getSingleAttendence(+id);
  console.log(attendence);

  if (!attendence) {
    const date = getDateOfDay(+id);
    return <AttendenceForm date={date} />;
  }
  const startDate = new Date(attendence.startDate);
  const endDate = new Date(attendence.endDate);

  return (
    <AttendenceForm
      date={startDate}
      startTime={formatTime(startDate, false)}
      endTime={formatTime(endDate, false)}
    />
  );
}
