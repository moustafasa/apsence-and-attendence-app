import { auth } from "@/auth";
import { Role } from "@/auth.config";
import { ReactNode } from "react";
import DashboardSideNav from "../../components/DashboardSideNav";
import { adminLinks } from "@/lib/navLinkObjs";

type Props = { Employee: ReactNode; Admin: ReactNode };

export default async function DashboardLayout({ Employee, Admin }: Props) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <div className="flex gap-2 h-[calc(100vh-theme(spacing.nav))] ">
      <aside className="w-60 bg-black-400">
        <DashboardSideNav links={adminLinks} />
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
