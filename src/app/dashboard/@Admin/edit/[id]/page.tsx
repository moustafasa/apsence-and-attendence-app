import EditEmployeeForm from "@/app/components/Employee/EditEmployeeForm";
import { getEmployee } from "@/lib/controllers/employeesController";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };
export default async function page({ params: { id } }: Props) {
  const employee = await getEmployee(id);
  if (!employee) return notFound();
  return (
    <div className="container">
      <EditEmployeeForm employee={employee} />
    </div>
  );
}
