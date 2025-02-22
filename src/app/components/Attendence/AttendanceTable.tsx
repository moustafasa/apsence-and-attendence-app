import Table from "@/app/components/table/Table";
import TableBody from "@/app/components/table/TableBody";
import AttendenceTableFooter from "./AttendenceTableFooter";
import cn from "@/lib/cssConditional";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import modifiedGetAttendence from "@/lib/modifiedGetAttendence";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CalcSalaryModal from "../CalcSalaryModal/CalcSalaryModal";

type Props = {
  searchParams: { show?: string; month?: string };
  monthMeta: Pick<
    IMonthAttendence,
    "_id" | "completed" | "monthIndex" | "paidSalary"
  >[];
  userId?: string;
  userName?: string;
  isAdmin?: boolean;
};

export default async function AttendanceTable({
  searchParams,
  monthMeta,
  userId,
  userName,
  isAdmin = false,
}: Props) {
  const todayDate = getDayDate();
  const month = searchParams?.month
    ? +searchParams.month
    : todayDate.getMonth();
  const currentMonthIndex = monthMeta.findIndex(
    (mon) => +mon.monthIndex === month
  );

  const modalUrl = () => {
    const search = new URLSearchParams(searchParams);
    search.append("show", "");
    return `?${search.toString()}`;
  };

  const theader = [
    { label: "days", addonClassName: "w-[70px]" },
    { label: "start", addonClassName: "w-[200px]" },
    { label: "end", addonClassName: "w-[200px]" },
    { label: "total hours", addonClassName: "w-[200px]" },
  ] satisfies TableHeader[];

  const tableBodyData = [
    {
      getContent(bodyData) {
        return bodyData.dayIndex;
      },
      th: true,
    },
    {
      getContent(bodyData) {
        return bodyData.startDate
          ? formatTime(new Date(bodyData.startDate))
          : bodyData.startDate;
      },
    },
    {
      getContent(bodyData) {
        return bodyData.endDate
          ? formatTime(new Date(bodyData.endDate))
          : bodyData.endDate;
      },
    },
    {
      getContent(bodyData) {
        return todayDate.getDate() >= bodyData.dayIndex
          ? (bodyData.totalHours as number).toFixed(2) + " hours"
          : "";
      },
    },
    ...(isAdmin
      ? [
          {
            getContent(bodyData: IDayAttendence, index: number) {
              if (
                month === todayDate.getMonth() &&
                !monthMeta[currentMonthIndex]?.completed
              )
                return (
                  index + 1 <= todayDate.getDate() && (
                    <Link
                      href={`/dashboard/view/${userId}/edit/${bodyData.dayIndex}`}
                      className="capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-1 rounded-lg"
                    >
                      edit
                    </Link>
                  )
                );
              else return null;
            },
          },
        ]
      : []),
  ] satisfies TableBodyElement<IDayAttendence>[];

  return (
    <div>
      {userName && (
        <h2 className="text-center text-3xl capitalize mt-10 font-bold mb-4">
          attendence of {userName}
        </h2>
      )}
      <h3
        className={cn(
          "text-center p-3 pt-3 capitalize text-2xl font-bold flex justify-center items-center gap-6",
          { "mt-10 mb-4 text-3xl": !isAdmin }
        )}
      >
        <Link
          href={{
            query: {
              month: monthMeta[currentMonthIndex + 1]?.monthIndex,
            },
          }}
          prefetch={currentMonthIndex < monthMeta.length - 1}
          className={cn({
            "pointer-events-none text-gray-600":
              currentMonthIndex >= monthMeta.length - 1,
          })}
        >
          <FaAngleLeft />
        </Link>
        <span>
          {!isAdmin && "attendence of "}
          {Intl.DateTimeFormat("en-US", { month: "long" }).format(
            month !== undefined ? new Date().setMonth(month) : todayDate
          )}
        </span>
        <Link
          href={{
            query: {
              month: monthMeta[currentMonthIndex - 1]?.monthIndex,
            },
          }}
          prefetch={currentMonthIndex > 0}
          className={cn({
            "pointer-events-none text-gray-600": currentMonthIndex <= 0,
          })}
        >
          <FaAngleRight />
        </Link>
      </h3>
      <div className="max-w-full">
        <Table
          theaders={theader}
          tfoot={
            <AttendenceTableFooter
              month={month}
              id={userId}
              paidSalary={monthMeta[currentMonthIndex]?.paidSalary}
            />
          }
          disabled={monthMeta[currentMonthIndex]?.completed}
          noOptions={!isAdmin}
        >
          <TableBody<IDayAttendence>
            promise={
              modifiedGetAttendence(month, userId) as Promise<IDayAttendence[]>
            }
            tableBodyData={tableBodyData}
            addOnClassNames={(index) => [
              {
                "outline-2 outline-green-100 outline-solid rounded-lg":
                  todayDate.getDate() === index &&
                  month === todayDate.getMonth(),
              },
            ]}
          />
        </Table>

        {!monthMeta[currentMonthIndex]?.paidSalary &&
          !monthMeta[currentMonthIndex]?.completed && (
            <Link
              href={modalUrl()}
              className="mx-auto block w-fit mt-5 capitalize bg-green-100 p-3 rounded-lg shadow-lg hover:bg-green-200 transition-colors duration-500 mb-5"
              scroll={false}
            >
              calc salary
            </Link>
          )}
      </div>
      {searchParams.show !== undefined &&
        !monthMeta[currentMonthIndex]?.paidSalary &&
        !monthMeta[currentMonthIndex].completed && (
          <CalcSalaryModal userId={userId} month={month} />
        )}
    </div>
  );
}
