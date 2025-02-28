import Skeleton from "../components/skeleton/Skeleton";

export default function loading() {
  return (
    <main className="container pt-10">
      <Skeleton classNames="sk-header w-[70%] mx-auto" />
      <Skeleton classNames=" sk-header mt-5 w-[30%] mx-auto" />
    </main>
  );
}
