"use client";
import AttendenceForm from "@/app/components/AttendenceForm";
import { setAttandenceAction } from "@/lib/actions";
import cn from "@/lib/cssConditional";
import getTodayDate from "@/lib/getTodayDate";
import { useFormState } from "react-dom";
import { FaExclamation } from "react-icons/fa";

export default function Page() {
  const todayDate = getTodayDate();

  return <AttendenceForm date={todayDate} />;
}
