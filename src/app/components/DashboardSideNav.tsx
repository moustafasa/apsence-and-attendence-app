"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { links: LinkObj[] };
export default function DashboardSideNav({ links }: Props) {
  const pathname = usePathname();
  return (
    <div className="capitalize p-3 ">
      <h2 className="my-3 text-xl ">pages</h2>
      <nav className=" space-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={clsx(
              "block duration-300 transition-colors  hover:bg-blue-300 py-2 px-3 rounded-lg",
              { "bg-blue-300": pathname === link.href }
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
