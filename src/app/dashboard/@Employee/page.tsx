import AttendenceTable from "@/app/components/AttendenceTable";
import AttendenceTableFooter from "@/app/components/AttendenceTableFooter";
import Table from "@/app/components/table/Table";
import cn from "@/lib/cssConditional";
import { getAttendences } from "@/lib/db";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import Link from "next/link";

export default async function page() {
  const attendences = await getAttendences();
  const todayDate = getDayDate();
  const tableData = new Array(30).fill("d").map((_, index) => {
    const att = attendences.find((att) => att.id === index + 1);
    const endDate = att && att.endDate && formatTime(new Date(att.endDate));
    return (
      <tr
        key={att?.id || index + 1}
        className={cn("odd:bg-black-400", {
          "outline-2 outline-green-100 outline-solid rounded-lg":
            todayDate.getDate() === index + 1,
        })}
      >
        <th className="px-3 py-5 ">{index + 1}</th>
        <td className="px-3 py-5">
          {att && formatTime(new Date(att.startDate))}
        </td>
        <td className="px-3 py-5">{endDate}</td>
        <td className="px-3 py-5">
          {att && (att.numberOfHours / 1000 / 60 / 60).toFixed(2) + " hours"}
        </td>
        <td className="px-3 py-5">
          {index + 1 < todayDate.getDate() && (
            <Link
              href={`/dashboard/edit/${att?.id || index + 1}`}
              className="capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-1 rounded-lg"
            >
              edit
            </Link>
          )}
        </td>
      </tr>
    );
  });

  const theader = [
    { label: "days", size: "70px" },
    { label: "start", size: "200px" },
    { label: "end", size: "200px" },
    { label: "total hours", size: "200px" },
  ] satisfies TableHeader[];

  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        your attendence
      </h2>
      <div className="max-w-full">
        <Table theaders={theader} tfoot={<AttendenceTableFooter />}>
          {tableData}
        </Table>

        <button className="mx-auto block w-fit mt-5 capitalize bg-green-100 p-3 rounded-lg shadow-lg hover:bg-green-200 transition-colors duration-500 mb-5">
          calc salary
        </button>
      </div>
    </div>
  );
}
