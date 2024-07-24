import cn from "@/lib/cssConditional";
import Link from "next/link";

export default function CalcSalaryModal() {
  return (
    <div
      className={cn(
        " fixed inset-0 grid place-items-center bg-black-100/80 px-5"
      )}
    >
      <div className="bg-blue-300 w-full max-w-[750px] p-5 rounded-lg shadow-lg">
        <h2 className="capitalize font-bold text-center text-3xl">
          calc salary
        </h2>
        <p className="capitalize text-xl p-3">
          <span>total hours: </span>
          <span>50 hours</span>
        </p>
        <p className="capitalize text-xl p-3">
          <span>total salary: </span>
          <span>500 pounds</span>
        </p>
        <div className="flex items-center gap-3 justify-center">
          <button className="block capitalize bg-green-100 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors duration-400 shadow-lg text-xl ">
            get paid
          </button>
          <Link
            href={"?"}
            className="block capitalize bg-black-300 py-2 px-3 rounded-lg hover:bg-black-400 transition-colors duration-400 shadow-lg text-xl "
          >
            cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
