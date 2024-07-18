"use client";
import { setAttandenceAction } from "@/lib/actions";
import cn from "@/lib/cssConditional";
import getTodayDate from "@/lib/getTodayDate";
import clsx from "clsx";
import { useFormState } from "react-dom";
import { FaExclamation } from "react-icons/fa";

export default function Page() {
  const todayDate = getTodayDate();
  const [error, formAction] = useFormState(setAttandenceAction, undefined);

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
          set your attendence
        </h2>
        <div className="flex gap-3 items-center mb-5">
          <span className="capitalize text-xl w-[150px]">today date</span>
          <p className="flex-1 text-xl capitalize px-3 py-2 ">
            {Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
              todayDate
            )}
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
          />
        </div>
        <div className="flex gap-3 items-center mb-5">
          <label htmlFor="endTime" className="capitalize text-xl w-[150px]">
            end time
          </label>
          <input
            className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
            type="time"
            name="end"
            id="endTime"
          />
        </div>
        <button className="capitalize text-xl bg-blue-300 mt-7 p-3 rounded-lg hover">
          set attendence
        </button>
      </form>
    </div>
  );
}
