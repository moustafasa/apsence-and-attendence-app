import { getNumberOfPassedMonthDays } from "@/lib/getNumberOfPassedMonthDays";

export default function page() {
  const numberOfPassedDays = getNumberOfPassedMonthDays();
  return (
    <div className="container">
      <form className="mt-10 flex flex-col max-w-[700px] mx-auto">
        <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
          set your attendence
        </h2>
        <div className="flex gap-3 items-center">
          <label htmlFor="day" className="capitalize text-xl">
            choose day
          </label>
          <select
            id="day"
            defaultValue={""}
            className="flex-1 bg-black-300 rounded-lg capitalize px-3 py-2"
          >
            <option value="" disabled>
              choose
            </option>
            {new Array(numberOfPassedDays).fill(3).map((value, index) => (
              <option
                key={index + 1}
                value={new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  index + 1
                ).toDateString()}
              >
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
