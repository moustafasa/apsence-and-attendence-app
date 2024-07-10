import { auth, Role } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode; User: ReactNode; Admin: ReactNode };

export default async function DashboardLayout({
  children,
  User,
  Admin,
}: Props) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      {session.user.role === Role.ADMIN
        ? Admin
        : session.user.role === Role.EMPLOYEE
        ? User
        : null}
    </div>
  );
}
