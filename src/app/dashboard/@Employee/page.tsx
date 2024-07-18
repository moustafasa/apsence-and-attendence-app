import AttendenceTable from "@/app/components/AttendenceTable";
import { getAttendences } from "@/lib/db";

export default async function page() {
  const attendences = await getAttendences();

  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        your attendence
      </h2>
      <AttendenceTable attendence={attendences} />
    </div>
  );
}
