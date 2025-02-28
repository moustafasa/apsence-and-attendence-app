import { auth } from "@/auth";
import Link from "next/link";
import Skeleton from "../components/skeleton/Skeleton";

export default async function Home() {
  const session = await auth();
  return (
    <main className=" container pt-10 text-balance text-center capitalize font-bold text-3xl">
      <p>hello to the home page of the apsence and attendence app</p>
      {session?.user ? (
        <Link
          href={"/dashboard"}
          className=" block pt-5 text-blue-300 hover:text-blue-400 transition-colors duration-300"
        >
          go to dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className=" block pt-5 text-blue-300 hover:text-blue-400 transition-colors duration-300"
        >
          go to login
        </Link>
      )}
    </main>
  );
}
