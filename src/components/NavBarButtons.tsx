"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default function NavBarButtons() {
  const { data } = useSession();
  const pathname = usePathname();

  return data?.user ? (
    pathname === "/" ? (
      <div className="flex gap-3">
        <Link
          href={"/dashboard"}
          className="block bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300"
        >
          go to dashboard
        </Link>
        <SignOutButton />
      </div>
    ) : (
      <SignOutButton />
    )
  ) : (
    <Link
      href="/login"
      className="block bg-blue-200 px-3 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300"
    >
      login
    </Link>
  );
}
