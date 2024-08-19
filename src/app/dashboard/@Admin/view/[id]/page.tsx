import AttendenceTableFooter from "@/app/components/AttendenceTableFooter";
import CalcSalaryModal from "@/app/components/CalcSalaryModal/CalcSalaryModal";
import Table from "@/app/components/table/Table";
import TableBody from "@/app/components/table/TableBody";
import cn from "@/lib/cssConditional";
import { getEmployee, getUserMonthsMetaData } from "@/lib/db";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import modifiedGetAttendence from "@/lib/modifiedGetAttendence";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type Props = {
  searchParams: { show?: string; month?: string };
  params: { id: string };
};

export default async function page({ searchParams, params: { id } }: Props) {
  const todayDate = getDayDate();
  const month = searchParams?.month
    ? +searchParams.month
    : todayDate.getMonth();
  const attendences = modifiedGetAttendence(month, id);
  const monthMeta = await getUserMonthsMetaData(id);
  const currentMonthIndex = monthMeta.findIndex((mon) => +mon.month === month);

  const employee = await getEmployee(id);

  const modalUrl = () => {
    const search = new URLSearchParams(searchParams);
    search.append("show", "");
    return `?${search.toString()}`;
  };

  if (!employee) {
    notFound();
  }

  if (currentMonthIndex === -1) {
    const search = new URLSearchParams(searchParams);
    search.delete("month");
    return redirect(`?${search.toString()}`);
  }

  const theader = [
    { label: "days", addonClassName: "w-[70px]" },
    { label: "start", addonClassName: "w-[200px]" },
    { label: "end", addonClassName: "w-[200px]" },
    { label: "total hours", addonClassName: "w-[200px]" },
  ] satisfies TableHeader[];

  const tableBodyData = [
    {
      getContent(bodyData, index) {
        return bodyData.id;
      },
      th: true,
    },
    {
      getContent(bodyData, index) {
        return bodyData.startDate
          ? formatTime(new Date(bodyData.startDate))
          : bodyData.startDate;
      },
    },
    {
      getContent(bodyData, index) {
        return bodyData.endDate
          ? formatTime(new Date(bodyData.endDate))
          : bodyData.endDate;
      },
    },
    {
      getContent(bodyData, index) {
        return todayDate.getDate() >= bodyData.id
          ? (bodyData.numberOfHours / 1000 / 60 / 60).toFixed(2) + " hours"
          : "";
      },
    },
  ] satisfies TableBodyElement<Attendence>[];

  return (
    <div>
      <h2 className="text-center text-3xl capitalize mt-10 font-bold mb-4">
        attendence of {employee?.name}
      </h2>
      <h3 className="text-center p-3 pt-3 capitalize text-2xl font-bold flex justify-center items-center gap-6">
        <Link
          href={{
            query: {
              month: monthMeta[currentMonthIndex - 1]?.month,
            },
          }}
          prefetch={currentMonthIndex > 0}
          className={cn({
            "pointer-events-none text-gray-600": currentMonthIndex <= 0,
          })}
        >
          <FaAngleLeft />
        </Link>
        <span>
          {Intl.DateTimeFormat("en-US", { month: "long" }).format(
            month ? new Date().setMonth(month) : todayDate
          )}
        </span>
        <Link
          href={{
            query: {
              month: monthMeta[currentMonthIndex + 1]?.month,
            },
          }}
          prefetch={currentMonthIndex < monthMeta.length - 1}
          className={cn({
            "pointer-events-none text-gray-600":
              currentMonthIndex >= monthMeta.length - 1,
          })}
        >
          <FaAngleRight />
        </Link>
      </h3>
      <div className="max-w-full">
        <Table
          theaders={theader}
          tfoot={<AttendenceTableFooter month={month} id={id} />}
          disabled={monthMeta[0]?.completed}
          noOptions
        >
          <TableBody<Attendence>
            promise={attendences as Promise<Attendence[]>}
            tableBodyData={tableBodyData}
            addOnClassNames={(index) => [
              {
                "outline-2 outline-green-100 outline-solid rounded-lg":
                  todayDate.getDate() === index && !month,
              },
              ,
            ]}
          />
        </Table>

        <Link
          href={modalUrl()}
          className="mx-auto block w-fit mt-5 capitalize bg-green-100 p-3 rounded-lg shadow-lg hover:bg-green-200 transition-colors duration-500 mb-5"
          scroll={false}
        >
          calc salary
        </Link>
      </div>
      {searchParams.show !== undefined && (
        <CalcSalaryModal userId={id} month={month} />
      )}
    </div>
  );
}
