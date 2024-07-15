import { auth } from "@/auth";
import { ReactNode } from "react";
import DashboardSideNav from "../components/DashboardSideNav";
import { adminLinks, employeeLinks } from "@/lib/navLinkObjs";
import { Role } from "@/authTypes.d";

type Props = { Employee: ReactNode; Admin: ReactNode };

export default async function DashboardLayout({ Employee, Admin }: Props) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <div className="flex gap-2 min-h-[calc(100vh-theme(spacing.nav))]">
      <aside className="w-60 bg-black-400">
        <DashboardSideNav
          links={
            session.user.role === Role.EMPLOYEE ? employeeLinks : adminLinks
          }
        />
      </aside>
      <div className="flex-1">
        {session.user.role === Role.ADMIN
          ? Admin
          : session.user.role === Role.EMPLOYEE
          ? Employee
          : null}
      </div>
    </div>
  );
}
