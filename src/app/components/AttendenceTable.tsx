import Link from "next/link";

type Props = { attendence: Attendence[] };

export default function AttendenceTable({ attendence }: Props) {
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
        <tbody>
          {attendence.map((att) => (
            <tr key={att.id} className="odd:bg-black-400">
              <th className="py-5 ">{att.id}</th>
              <td className="py-5">
                {Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
                  new Date(att.startDate)
                )}
              </td>
              <td className="py-5">
                {Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
                  new Date(att.endDate)
                )}
              </td>
              <td className="py-5">
                {(att.numberOfHours / 1000 / 60 / 60).toFixed(2)} hours
              </td>
              <td className="py-5">
                <Link
                  href={`/dashboard/edit/${att.id}`}
                  className="capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-1 rounded-lg"
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
