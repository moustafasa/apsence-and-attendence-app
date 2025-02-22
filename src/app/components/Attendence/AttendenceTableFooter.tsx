import { calcTotalMonthHours } from "@/lib/controllers/attendenceController";
import cn from "@/lib/cssConditional";

type Props = { month?: number; id?: IUser["_id"]; paidSalary?: number };
export default async function AttendenceTableFooter({
  month,
  id,
  paidSalary,
}: Props) {
  const totalMonthHours = await calcTotalMonthHours(month, id);

  return (
    <tfoot className="">
      <tr className="bg-black-200">
        <th
          className="px-3 py-5 text-2xl rounded-es-lg"
          colSpan={paidSalary ? 1 : 2}
        >
          total month hours :
        </th>
        <td
          colSpan={paidSalary ? 1 : 3}
          className=" text-blue-400 font-bold text-3xl py-5 px-3 text-center rounded-ee-lg"
        >
          {totalMonthHours.toFixed(2)} hours
        </td>
        {paidSalary ? (
          <>
            <th
              className="px-3 py-5 text-2xl rounded-es-lg"
              colSpan={id ? 2 : 1}
            >
              <span
                className={cn("block ", {
                  "ps-32": id,
                })}
              >
                paid salary :
              </span>
            </th>
            <td
              className={cn(
                " text-blue-400 font-bold text-3xl py-5 px-3 rounded-ee-lg ",
                { "text-left": id }
              )}
            >
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EGP",
              }).format(paidSalary)}
            </td>
          </>
        ) : null}
      </tr>
    </tfoot>
  );
}
