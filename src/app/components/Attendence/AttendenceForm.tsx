"use client";
import { setAttandenceAction } from "@/lib/actions/attendenceAction";
import cn from "@/lib/cssConditional";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import { useFormState } from "react-dom";
import { FaExclamation } from "react-icons/fa";

type Props = {
  date: Date;
  startTime?: Date;
  endTime?: Date;
  userId?: string;
};

export default function AttendenceForm({
  date,
  startTime,
  endTime,
  userId,
}: Props) {
  const [error, formAction] = useFormState(
    setAttandenceAction.bind(null, date, userId),
    undefined
  );

  const todayDate = getDayDate();

  return (
    <div className="container">
      <form
        className="mt-10 flex flex-col max-w-[700px] mx-auto"
        action={formAction}
        noValidate
      >
        <p
          className={cn(
            `capitalize  p-3 mb-3 rounded-lg bg-red-600 flex items-center gap-3 invisible min-h-14 `,
            { visible: !!error }
          )}
        >
          <FaExclamation className="inline" /> {error}
        </p>
        <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
          {date.getTime() !== todayDate.getTime()
            ? "edit the attendence"
            : "set today attendence"}
        </h2>
        <div className="flex gap-3 items-center mb-5">
          <span className="capitalize text-xl w-[150px]">day date</span>
          <p className="flex-1 text-xl capitalize px-3 py-2 ">
            {startTime ? formatTime(startTime, "hh:mm:ss a") : ""}
          </p>
        </div>
        <div className="flex gap-3 items-center mb-5">
          <label htmlFor="startTime" className="capitalize text-xl w-[150px]">
            start time
          </label>
          <input
            className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
            type="time"
            name="start"
            id="startTime"
            defaultValue={
              startTime ? formatTime(startTime, "hh:mm") : undefined
            }
          />
        </div>
        <div className="flex gap-3 items-center mb-5">
          <label htmlFor="endTime" className="capitalize text-xl w-[150px]">
            end time
          </label>
          <input
            className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
            type="datetime-local"
            name="end"
            id="endTime"
            defaultValue={
              endTime
                ? formatTime(endTime, "yyyy-MM-dd.hh:mm").replace(".", "T")
                : undefined
            }
          />
        </div>
        <button className="capitalize text-xl bg-blue-300 mt-7 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 w-full">
          set attendence
        </button>
      </form>
    </div>
  );
}
