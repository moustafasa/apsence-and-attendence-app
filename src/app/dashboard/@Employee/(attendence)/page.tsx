import AttendanceTable from "@/app/components/Attendence/AttendanceTable";
import { getUserMonthsMetaData } from "@/lib/controllers/attendenceController";

type Props = {
  searchParams: { show?: string; month?: string };
};

export default async function page({ searchParams }: Props) {
  const monthMeta = await getUserMonthsMetaData();
  return <AttendanceTable searchParams={searchParams} monthMeta={monthMeta} />;
}
