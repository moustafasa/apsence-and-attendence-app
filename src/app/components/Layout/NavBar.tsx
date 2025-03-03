import Link from "next/link";

import { auth } from "@/auth";
import NavBarButtons from "./NavBarButtons";
import ToggleDashboardSideNav from "./ToggleDashboardSideNav";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className=" py-3 bg-black-200 shadow-lg h-nav relative z-40">
      <div className="container flex justify-between capitalize items-center h-full">
        <div className="flex justify-between gap-4">
          <h2 className="font-bold">
            <Link className="block whitespace-nowrap" href={"/"}>
              created by moustafa
            </Link>
          </h2>
          {!!session?.user && <ToggleDashboardSideNav />}
        </div>

        <NavBarButtons session={session} />
      </div>
    </nav>
  );
}
