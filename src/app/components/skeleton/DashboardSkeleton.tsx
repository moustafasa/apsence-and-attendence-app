import cn from "@/lib/cssConditional";
import Skeleton from "./Skeleton";
import Table from "../table/Table";
import TableSkeleton from "./TableSkeleton";

export default function DashboardSkeleton() {
  const theader = [
    { label: <Skeleton classNames="sk-text" />, addonClassName: "w-[70px]" },
    { label: <Skeleton classNames="sk-text" />, addonClassName: "w-[200px]" },
    { label: <Skeleton classNames="sk-text" />, addonClassName: "w-[200px]" },
    { label: <Skeleton classNames="sk-text" />, addonClassName: "w-[200px]" },
  ] satisfies TableHeader[];

  return (
    <div className="flex gap-2 min-h-[calc(100vh-theme(spacing.nav))] relative">
      <aside className="w-60 bg-black-400 h-full hidden md:block">
        <div className="p-3">
          <h2 className="my-3">pages</h2>
          <nav className="space-y-3">
            {Array(2)
              .fill(0)
              .map((_, id) => (
                <div key={id} className="py-2 px-3">
                  <Skeleton classNames={cn("sk-text !bg-black-300")} />
                </div>
              ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 max-w-full">
        <Skeleton classNames="sk-header mt-10 mb-4 w-[35%] mx-auto" />
        <div className="max-w-full">
          <Table theaders={theader} noOptions={true}>
            <TableSkeleton columns={theader.length} options={undefined} />
          </Table>
        </div>
      </div>
    </div>
  );
}
