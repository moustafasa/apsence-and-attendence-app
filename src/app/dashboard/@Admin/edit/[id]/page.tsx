import EditEmployeeForm from "@/app/components/EditEmployeeForm";
import { getEmployee } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };
export default async function page({ params: { id } }: Props) {
  const employee = await getEmployee(+id);
  if (!employee) return notFound();
  return (
    <div className="container">
      <EditEmployeeForm employee={employee} />
    </div>
  );
}
