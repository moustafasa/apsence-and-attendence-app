import cn from "@/lib/cssConditional";
import { ReactNode } from "react";

type Props = {
  theaders: TableHeader[];
  tfoot?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  noOptions?: boolean;
};

export default function Table({
  tfoot,
  children,
  theaders,
  disabled = false,
  noOptions,
}: Props) {
  return (
    <div
      className={cn("p-5 overflow-x-auto max-w-full ", {
        "opacity-70 ": disabled,
      })}
    >
      <table
        className={cn(
          "min-w-full whitespace-nowrap border-separate capitalize table-fixed border-spacing-0 text-center shadow-lg text-nowrap",
          { "pointer-events-none": disabled }
        )}
      >
        <thead className="">
          <tr className="bg-black-100">
            {theaders.map((th, ind) => (
              <th
                key={ind}
                className={cn("px-3 py-5", th.addonClassName, {
                  "rounded-ss-lg": ind === 0,
                  "rounded-se-lg": noOptions && ind === theaders.length - 1,
                })}
              >
                {th.label}
              </th>
            ))}
            {!noOptions && (
              <th className="rounded-se-lg px-3 py-5 w-[200px]">options</th>
            )}
          </tr>
        </thead>
        <tbody>{children}</tbody>
        {tfoot}
      </table>
    </div>
  );
}
