import Link from "next/link";

import { auth } from "@/auth";
import NavBarButtons from "./NavBarButtons";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className=" py-3 bg-black-200 shadow-lg h-nav">
      <div className="container flex justify-between capitalize items-center">
        <h2 className="font-bold">
          <Link href={"/"}>created by moustafa</Link>
        </h2>

        <NavBarButtons session={session} />
      </div>
    </nav>
  );
}
