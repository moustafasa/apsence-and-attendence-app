"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import NotificationButton from "../Notification/NotificationButton";
import SignOutButton from "./SignOutButton";

export default function NavBarButtons({
  session,
}: {
  session: Session | null;
}) {
  const pathname = usePathname();

  return session?.user ? (
    <div className="flex gap-3 items-center ">
      <NotificationButton />
      {pathname === "/" && (
        <Link
          href={"/dashboard"}
          className="block max-md:hidden bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300"
        >
          go to dashboard
        </Link>
      )}

      <SignOutButton />
    </div>
  ) : (
    <Link
      href="/login"
      className="block bg-blue-300 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300"
    >
      login
    </Link>
  );
}
