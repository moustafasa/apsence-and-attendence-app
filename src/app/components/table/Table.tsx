import cn from "@/lib/cssConditional";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  theaders: TableHeader[];
  tfoot?: ReactNode;
  children: ReactNode;
};

export default function Table({ tfoot, children, theaders }: Props) {
  return (
    <div className="p-5 overflow-x-auto max-w-full">
      <table className="min-w-full border-separate capitalize table-fixed border-spacing-0 text-center shadow-lg text-nowrap">
        <thead className="">
          <tr className="bg-black-100">
            {theaders.map((th, ind) => (
              <th
                key={th.label}
                className={cn("px-3 py-5", th.addonClassName, {
                  "rounded-ss-lg": ind === 0,
                })}
              >
                {th.label}
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
