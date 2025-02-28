"use client";
import { getPaidAction } from "@/lib/actions/attendenceAction";
import cn from "@/lib/cssConditional";
import { triggerNotification } from "@/lib/PusherConnect";
import { NotificationTypes } from "@/types/Enums";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type Props = {
  totalHours: number;
  employee: Omit<IUser, "password" | "role">;
  admin?: boolean;
};

export default function ClientCalcSalaryModal({
  totalHours,
  employee,
  admin,
}: Props) {
  const [holidays, setHolidays] = useState(false);
  const [totalSalary, setTotalSalary] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const month = useMemo(
    () => (searchParams.get("month") ? +!searchParams.get("month") : undefined),
    [searchParams]
  );
  const currentUser = useSession().data?.user;

  const calcSalary = useCallback(() => {
    if (holidays) {
      setTotalSalary(
        +((totalHours / 30) * (employee.hourlyRate as number)).toFixed(2)
      );
    } else {
      setTotalSalary(
        +((totalHours / 26) * (employee.hourlyRate as number)).toFixed(2)
      );
    }
  }, [employee.hourlyRate, holidays, totalHours]);

  const hideSearch = useCallback(() => {
    const search = new URLSearchParams(searchParams);
    search.delete("show");
    router.replace(`${pathname}?${search}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const onClientPaidHandler = useCallback(async () => {
    await triggerNotification({
      from: employee._id,
      to: "admin",
      type: NotificationTypes.SALARY_REQUEST,
      read: false,
    });
  }, [employee._id]);

  const onServerPaidHandler = useCallback(async () => {
    if (currentUser) {
      await getPaidAction(employee._id, totalSalary, month);
      await triggerNotification({
        from: currentUser.userId,
        to: employee._id,
        type: NotificationTypes.SALARY_PAID,
        read: false,
      });
    }
  }, [employee._id, month, totalSalary, currentUser]);

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
          <dd className=" ">{totalHours.toFixed(2)} hours</dd>
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
          <button
            onClick={async () => {
              admin ? await onServerPaidHandler() : await onClientPaidHandler();
              hideSearch();
            }}
            className="block capitalize bg-green-100 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors duration-400 shadow-lg text-xl "
          >
            get paid
          </button>
          <button
            onClick={hideSearch}
            className="block capitalize bg-black-300 py-2 px-3 rounded-lg hover:bg-black-400 transition-colors duration-400 shadow-lg text-xl "
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
