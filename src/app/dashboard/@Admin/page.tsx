import Table from "@/app/components/Table";
import { getEmployee } from "@/lib/db";

export default async function page() {
  const employees = await getEmployee();
  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        emplyees list
      </h2>
      <Table employees={employees} />
    </div>
  );
}
