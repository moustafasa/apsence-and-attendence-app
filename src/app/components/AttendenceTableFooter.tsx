import calcTotalMonthHours from "@/lib/calcTotalMonthHours";

type Props = { month?: number; id?: number };
export default async function AttendenceTableFooter({ month, id }: Props) {
  const totalMonthHours = await calcTotalMonthHours(month, id);

  return (
    <tfoot className="">
      <tr className="bg-black-200">
        <th className="px-3 py-5 text-2xl rounded-es-lg" colSpan={2}>
          total month hours :
        </th>
        <td
          colSpan={3}
          className=" text-blue-400 font-bold text-3xl py-5 px-3 text-center rounded-ee-lg"
        >
          {(totalMonthHours / 1000 / 60 / 60).toFixed(2)} hours
        </td>
      </tr>
    </tfoot>
  );
}
