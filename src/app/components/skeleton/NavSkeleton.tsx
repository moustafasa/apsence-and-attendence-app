import Link from "next/link";
import Skeleton from "./Skeleton";

export default function NavSkeleton() {
  return (
    <nav className=" py-3 bg-black-200 shadow-lg h-nav">
      <div className="container flex justify-between capitalize items-center">
        <h2 className="font-bold">
          <Link href={"/"}>created by moustafa</Link>
        </h2>
        <div className="flex gap-3 items-center">
          <Skeleton classNames="sk-button" />
        </div>
      </div>
    </nav>
  );
}
