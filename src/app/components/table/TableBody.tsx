import { Suspense } from "react";
import { TableBodyUI } from "./TableBodyUI";
import { Props } from "./types";
import TableSkeleton from "../skeleton/TableSkeleton";

export default function TableBody<
  T extends IDayAttendence | Omit<IUser, "password">
>({ options, ...props }: Props<T> & { options?: number }) {
  return (
    <Suspense
      fallback={
        <TableSkeleton columns={props.tableBodyData.length} options={options} />
      }
    >
      <TableBodyUI<T> {...props} />
    </Suspense>
  );
}
