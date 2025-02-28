import cn from "@/lib/cssConditional";
import Skeleton from "./Skeleton";

type Props = {
  columns: number;
  options?: number;
};
export default function TableSkeleton({ columns, options }: Props) {
  return Array(4)
    .fill(0)
    .map((_, i) => (
      <tr key={i + "tr"} className="odd:bg-black-400">
        {Array(options ? columns - 1 : columns)
          .fill(0)
          .map((_, ind) => (
            <td key={ind} className={cn("px-3 py-5")}>
              <Skeleton
                classNames={cn("sk-text", { "!bg-black-300": i % 2 === 0 })}
              />
            </td>
          ))}
        {!!options && (
          <td>
            <div className="flex gap-3 px-3 py-5 items-center justify-center">
              {Array(options)
                .fill(0)
                .map((_, ind) => (
                  <Skeleton
                    key={ind}
                    classNames={cn("sk-button", {
                      "!bg-black-300": i % 2 === 0,
                    })}
                  />
                ))}
            </div>
          </td>
        )}
      </tr>
    ));
}
