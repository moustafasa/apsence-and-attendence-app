import Link from "next/link";
import NavBarButtons from "./NavBarButtons";

export default function NavBar() {
  return (
    <nav className=" py-3 bg-black-200 shadow-lg">
      <div className="container flex justify-between capitalize items-center">
        <h2 className="font-bold">
          <Link href={"/"}>created by moustafa</Link>
        </h2>
        <NavBarButtons />
      </div>
    </nav>
  );
}
