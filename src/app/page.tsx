import Image from "next/image";

export default function Home() {
  return (
    <main className=" container pt-10 text-balance text-center capitalize font-bold text-3xl">
      <p>hello to the home page of the apsence and attendence app</p>
      <a
        href="/login"
        className=" block pt-5 text-blue-300 hover:text-blue-400 transition-colors duration-300"
      >
        go to login
      </a>
    </main>
  );
}
