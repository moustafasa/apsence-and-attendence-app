"use client";
import AttendenceForm from "@/app/components/AttendenceForm";
import getDateOfDay from "@/lib/getDateOfDay";

export default function Page() {
  const todayDate = getDateOfDay();

  return <AttendenceForm date={todayDate} />;
}
