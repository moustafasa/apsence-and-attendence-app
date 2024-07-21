import cn from "@/lib/cssConditional";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode; tfoot?: ReactNode; headers: TableHeader[] };

export default function Table({ children, tfoot, headers }: Props) {
  return (
    <div className="p-5 overflow-auto ">
      <table className="min-w-full border-separate capitalize table-fixed border-spacing-0 text-center shadow-lg text-nowrap">
        <thead className="">
          <tr className="bg-black-100">
            {headers.map((head, ind) => (
              <th
                className={cn("px-3 py-5", {
                  [`w-[${head.size}]`]: !!head.size,
                  "rounded-ss-lg": ind === 0,
                })}
                key={head.label}
              >
                {head.label}
              </th>
            ))}
            <th className="rounded-se-lg px-3 py-5 w-[200px]">options</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
        {tfoot}
      </table>
    </div>
  );
}
