import EmployeeTable from "@/app/components/EmployeesTable";
import { getEmployees } from "@/lib/db";

export default async function page() {
  const employees = await getEmployees();
  return (
    <div>
      <h2 className="text-center p-3 mt-10 mb-4 capitalize text-3xl font-bold">
        emplyees list
      </h2>
      <EmployeeTable employees={employees} />
    </div>
  );
}
