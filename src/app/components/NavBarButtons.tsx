"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { Session } from "next-auth";
import { IoNotifications } from "react-icons/io5";

export default function NavBarButtons({
  session,
}: {
  session: Session | null;
}) {
  const pathname = usePathname();

  return session?.user ? (
    <div className="flex gap-3 items-center">
      <button className="text-xl relative">
        <sub className="grid place-content-center text-xs bg-red-600 absolute aspect-square h-5  left-0 top-0 -translate-x-1/2 -translate-y-1/2  rounded-full ">
          10
        </sub>
        <IoNotifications />
      </button>

      {pathname === "/" && (
        <Link
          href={"/dashboard"}
          className="block bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300"
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
