import { auth } from "@/auth";
import { ReactNode, Suspense } from "react";
import DashboardSideNav from "../components/Layout/DashboardSideNav";
import { adminLinks, employeeLinks } from "@/lib/navLinkObjs";
import { Role } from "@/types/Enums";

type Props = { Employee: ReactNode; Admin: ReactNode };

export default async function DashboardLayout({ Employee, Admin }: Props) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <div className="flex gap-2 min-h-[calc(100vh-theme(spacing.nav))] relative">
      <DashboardSideNav
        links={session.user.role === Role.EMPLOYEE ? employeeLinks : adminLinks}
      />
      <div className="flex-1 max-w-full overflow-auto">
        {session.user.role === Role.ADMIN
          ? Admin
          : session.user.role === Role.EMPLOYEE
          ? Employee
          : null}
      </div>
    </div>
  );
}
