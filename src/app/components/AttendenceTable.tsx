import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import Link from "next/link";

type Props = { attendence: Attendence[] };

export default function AttendenceTable({ attendence }: Props) {
  const todayDate = getDayDate();
  const tableData = new Array(30).fill("d").map((_, index) => {
    const att = attendence.find((att) => att.id === index + 1);
    const endDate = att && att.endDate && formatTime(new Date(att.endDate));
    return (
      <tr key={att?.id || index + 1} className="odd:bg-black-400">
        <th className="py-5 ">{index + 1}</th>
        <td className="py-5">{att && formatTime(new Date(att.startDate))}</td>
        <td className="py-5">{endDate}</td>
        <td className="py-5">
          {att && (att.numberOfHours / 1000 / 60 / 60).toFixed(2) + " hours"}
        </td>
        <td className="py-5">
          {index + 1 <= todayDate.getDate() && (
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

  return (
    <div className="p-5 overflow-x-auto">
      <table className="min-w-full border-separate capitalize table-fixed border-spacing-0 text-center shadow-lg">
        <thead className="">
          <tr className="bg-black-100">
            <th className=" rounded-ss-lg py-5 w-[70px]">days</th>
            <th className="py-5">start</th>
            <th className=" py-5">end</th>
            <th className=" py-5">total hours</th>
            <th className="rounded-se-lg py-5">options</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
      <div className="mt-6 p-10">
        <h3 className="capitalize text-2xl flex items-center gap-3 text-blue-400 ">
          total month hours: <span className="">{300} hours</span>
        </h3>
        <button className="mx-auto block w-fit mt-5 capitalize bg-green-100 p-3 rounded-lg shadow-lg hover:bg-green-200 transition-colors duration-500">
          calc salary
        </button>
      </div>
    </div>
  );
}
