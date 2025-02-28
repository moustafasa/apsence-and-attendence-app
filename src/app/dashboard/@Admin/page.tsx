import Table from "@/app/components/table/Table";
import TableBody from "@/app/components/table/TableBody";
import { getEmployees } from "@/lib/controllers/employeesController";
import Link from "next/link";
import { deleteEmployeeAction } from "@/lib/actions/employeesActions";
import { calcTotalMonthHours } from "@/lib/controllers/attendenceController";

export default async function page({
  searchParams,
}: {
  searchParams: { month?: string };
}) {
  const employees = getEmployees();

  const tHeaders = [
    { label: "id" },
    { label: "name" },
    { label: "hourly rate" },
    { label: "number of worked hours" },
  ] satisfies TableHeader[];

  const tableBody = [
    { getContent: (_, index) => index + 1 },
    { getContent: (bodyData) => bodyData.name },
    { getContent: (bodyData) => bodyData.hourlyRate },
    {
      getContent: async (bodyData) => {
        const totalHours = await calcTotalMonthHours(
          searchParams.month ? +searchParams.month : undefined,
          bodyData._id
        );
        return totalHours.toFixed(2);
      },
    },
    {
      getContent: (bodyData) => (
        <div className="flex justify-center gap-3">
          <form action="">
            <button
              formAction={deleteEmployeeAction.bind(undefined, bodyData._id)}
              className=" capitalize bg-red-600 transition-colors duration-300 hover:bg-red-700 shadow-sm px-4 py-2 rounded-lg"
            >
              delete
            </button>
          </form>
          <Link
            href={`/dashboard/edit/${bodyData._id}`}
            className=" capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-2 rounded-lg"
          >
            edit
          </Link>
          <Link
            href={`/dashboard/view/${bodyData._id}`}
            className=" capitalize bg-blue-300 transition-colors duration-300 hover:bg-blue-200 shadow-sm px-4 py-2 rounded-lg"
          >
            view
          </Link>
        </div>
      ),
    },
  ] satisfies TableBodyElement<Omit<IUser, "password">>[];

  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        emplyees list
      </h2>
      <Table theaders={tHeaders}>
        <TableBody<Omit<IUser, "password">>
          promise={employees}
          tableBodyData={tableBody}
          options={3}
        />
      </Table>
    </div>
  );
}
