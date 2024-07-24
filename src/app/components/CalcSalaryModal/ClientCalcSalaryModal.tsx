"use client";
import convertMillSecondsToHours from "@/lib/convertMillSecondsToHours";
import cn from "@/lib/cssConditional";
import Link from "next/link";
import { useState } from "react";

type Props = { totalHours: number; hourRate: number };

export default function ClientCalcSalaryModal({ totalHours, hourRate }: Props) {
  const [holidays, setHolidays] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const totalHoursInHours = convertMillSecondsToHours(totalHours);
  const calcSalary = () => {
    console.log(holidays);
    if (holidays) {
      setTotalSalary(+((totalHoursInHours / 30) * hourRate).toFixed(2));
    } else {
      setTotalSalary(+((totalHoursInHours / 26) * hourRate).toFixed(2));
    }
  };
  return (
    <div
      className={cn(
        " fixed inset-0 grid place-items-center bg-black-100/80 px-5"
      )}
    >
      <div className="bg-blue-300 w-full max-w-[750px] p-5 rounded-lg shadow-lg">
        <h2 className="capitalize font-bold text-center text-3xl">
          calc salary
        </h2>
        <dl className="capitalize text-xl items-center flex px-3  gap-3">
          <dt className="  text-2xl font-bold">total hours: </dt>
          <dd className=" ">{totalHoursInHours} hours</dd>
        </dl>
        <div className="px-6 flex gap-2 capitalize text-xl mt-2 items-center cursor-pointer">
          <input
            id="with-holidays"
            type="checkbox"
            className=" accent-green-200 w-6 h-6 cursor-pointer focu"
            checked={holidays}
            onChange={(e) => setHolidays(e.target.checked)}
          />
          <label htmlFor="with-holidays" className=" cursor-pointer">
            holidays
          </label>
        </div>
        <button
          onClick={calcSalary}
          className="block capitalize bg-blue-200 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-400 shadow-lg text-xl mx-auto"
        >
          calc
        </button>

        <hr className="my-4" />
        <dl className="capitalize text-xl mb-7 items-center flex px-3  gap-3 justify-center">
          <dt className="  text-2xl font-bold">total salary: </dt>
          <dd className=" ">{totalSalary} pounds</dd>
        </dl>
        <div className="flex items-center gap-3 justify-center">
          <button className="block capitalize bg-green-100 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors duration-400 shadow-lg text-xl ">
            get paid
          </button>
          <Link
            href={"?"}
            className="block capitalize bg-black-300 py-2 px-3 rounded-lg hover:bg-black-400 transition-colors duration-400 shadow-lg text-xl "
            scroll={false}
          >
            cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
