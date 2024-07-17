"use client";
import { setAttandenceAction } from "@/lib/actions";
import { getNumberOfPassedMonthDays } from "@/lib/getNumberOfPassedMonthDays";
import { useFormState } from "react-dom";
import { FaExclamation } from "react-icons/fa";

export default function Page() {
  const numberOfPassedDays = getNumberOfPassedMonthDays();
  const nowDate = new Date();
  const defaultDayValue = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getHours() > 5 ? nowDate.getDate() : nowDate.getDate() - 1
  ).toISOString();
  const [error, formAction] = useFormState(setAttandenceAction, undefined);

  return (
    <div className="container">
      <form
        className="mt-10 flex flex-col max-w-[700px] mx-auto"
        action={formAction}
        noValidate
      >
        <p className="capitalize  p-3 mb-3 rounded-lg bg-red-600 flex items-center gap-3 ">
          <FaExclamation className="inline" /> {error}
        </p>
        <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
          set your attendence
        </h2>
        <div className="flex gap-3 items-center mb-5">
          <label htmlFor="day" className="capitalize text-xl w-[150px]">
            choose day
          </label>
          <select
            id="day"
            defaultValue={defaultDayValue}
            className="flex-1 bg-black-200 outline-none shadow-lg focus:ring-2 rounded-lg capitalize px-3 py-2 "
            name="day"
          >
            <option value="" disabled>
              choose
            </option>
            {new Array(numberOfPassedDays).fill(3).map((value, index) => (
              <option
                key={index + 1}
                value={new Date(
                  nowDate.getFullYear(),
                  nowDate.getMonth(),
                  index + 1
                ).toISOString()}
              >
                {index + 1}
              </option>
            ))}
          </select>
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
