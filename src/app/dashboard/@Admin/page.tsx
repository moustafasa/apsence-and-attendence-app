import Table from "@/app/components/table/Table";
import TableBody from "@/app/components/table/TableBody";
import { getEmployees } from "@/lib/db";
import Link from "next/link";

export default async function page() {
  const employees = getEmployees();

  const tHeaders = [
    { label: "id" },
    { label: "name" },
    { label: "hourly rate" },
    { label: "bonus" },
    { label: "number of worked hours" },
  ] satisfies TableHeader[];

  const tableBody = [
    { getContent: (_, index) => index + 1 },
    { getContent: (bodyData) => bodyData.name },
    { getContent: (bodyData) => bodyData.hourlyRate },
    { getContent: (bodyData) => bodyData.bonus },
    { getContent: (bodyData) => bodyData.bonus },
    {
      getContent: (bodyData) => (
        <div className="flex justify-center gap-3">
          <Link
            href={`/dashboard/edit/${bodyData.id}`}
            className=" capitalize bg-green-100 transition-colors duration-300 hover:bg-green-200 shadow-sm px-4 py-2 rounded-lg"
          >
            edit
          </Link>
          <Link
            href={`/dashboard/view/${bodyData.id}`}
            className=" capitalize bg-blue-300 transition-colors duration-300 hover:bg-blue-200 shadow-sm px-4 py-2 rounded-lg"
          >
            view
          </Link>
        </div>
      ),
    },
  ] satisfies TableBodyElement<DbEmployeeUser>[];

  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        emplyees list
      </h2>
      <Table theaders={tHeaders}>
        <TableBody<DbEmployeeUser>
          promise={employees}
          tableBodyData={tableBody}
        />
      </Table>
    </div>
  );
}
