import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Table from "../table/Table";
import AttendenceTableFooterSkeleton from "./AttendenceTableFooterSkeleton";
import Skeleton from "./Skeleton";
import TableSkeleton from "./TableSkeleton";
import cn from "@/lib/cssConditional";

type Props = { isAdmin?: boolean };
export default function ViewSkeleton({ isAdmin }: Props) {
  const theader = [
    { label: "days", addonClassName: "w-[70px]" },
    { label: "start", addonClassName: "w-[200px]" },
    { label: "end", addonClassName: "w-[200px]" },
    { label: "total hours", addonClassName: "w-[200px]" },
  ] satisfies TableHeader[];
  return (
    <div>
      {!!isAdmin && (
        <Skeleton classNames="sk-header mt-10 mb-4 w-[35%] mx-auto" />
      )}

      <h2
        className={cn(
          "text-2xl font-bold p-3 pt-3 flex justify-center items-center gap-6",
          { "mt-10 mb-4 text-3xl": !isAdmin }
        )}
      >
        <div className="text-gray-600">
          <FaAngleLeft />
        </div>
        <Skeleton
          classNames={cn({
            "sk-text w-32": isAdmin,
            "sk-header w-[25%]": !isAdmin,
          })}
        />
        <div className="text-gray-600">
          <FaAngleRight />
        </div>
      </h2>
      <div className="max-w-full">
        <Table
          theaders={theader}
          tfoot={<AttendenceTableFooterSkeleton />}
          noOptions={!isAdmin}
        >
          <TableSkeleton
            columns={isAdmin ? theader.length + 1 : theader.length}
            options={isAdmin ? 1 : undefined}
          />
        </Table>

        <Skeleton classNames=" sk-button mx-auto block mt-5 p-3 mb-5" />
      </div>
    </div>
  );
}
