type Props = { attendence: Attendence[] };

export default function AttendenceTable({ attendence }: Props) {
  return (
    <div className="p-5">
      <table className="w-full border-separate capitalize table-fixed border-spacing-0 text-center shadow-lg">
        <thead className="">
          <tr className="bg-black-100">
            <th className=" rounded-ss-lg py-3 w-[70px]">days</th>
            <th className="py-3">start</th>
            <th className=" py-3">end</th>
            <th className=" py-3">total hours</th>
            <th className="rounded-se-lg py-3">options</th>
          </tr>
        </thead>
        <tbody>
          {attendence.map((att) => (
            <tr key={att.id} className="odd:bg-black-400">
              <th className="py-3 ">{att.id}</th>
              <td className="py-3">
                {Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
                  new Date(att.startDate)
                )}
              </td>
              <td className="py-3">
                {Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
                  new Date(att.endDate)
                )}
              </td>
              <td className="py-3">
                {(att.numberOfHours / 1000 / 60 / 60).toFixed(2)} hours
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
