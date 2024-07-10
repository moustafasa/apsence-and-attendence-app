import { auth } from "@/auth";
import { Role } from "@/auth.config";
import { ReactNode } from "react";

type Props = { children: ReactNode; Employee: ReactNode; Admin: ReactNode };

export default async function DashboardLayout({
  children,
  Employee,
  Admin,
}: Props) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <div>
      {session.user.role === Role.ADMIN
        ? Admin
        : session.user.role === Role.EMPLOYEE
        ? Employee
        : null}
    </div>
  );
}
