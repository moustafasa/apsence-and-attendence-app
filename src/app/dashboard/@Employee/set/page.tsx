import { setInAction, setOutAction } from "@/lib/actions/attendenceAction";
import { getSingleAttendence } from "@/lib/controllers/attendenceController";
import formatTime from "@/lib/formatTime";
import getDayDate from "@/lib/getDayDate";
import { FaCheck } from "react-icons/fa";

export default async function Page() {
  const todayDate = getDayDate();
  const att = await getSingleAttendence();

  if (att.completed)
    return (
      <div className="w-full h-full flex items-center justify-center capitalize text-4xl font-bold flex-col gap-4">
        you paid this month please wait untill new month
        <FaCheck className="text-green-500" />
      </div>
    );

  return (
    <div className="container">
      <div className="mt-10 flex flex-col max-w-[700px] mx-auto">
        <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
          set today attendence
        </h2>
        <div className="flex gap-3 items-center mb-5">
          <span className="capitalize text-xl w-[150px]">day date : </span>
          <p className="flex-1 text-xl capitalize px-3 py-2 ">
            {formatTime(att.days?.startDate || todayDate, "dd MMM yyyy")}
          </p>
        </div>
        <div className="flex gap-3 items-center mb-5">
          <label className="capitalize text-xl w-[150px]">start time : </label>
          <p className="flex-1 text-xl capitalize px-3 py-2 ">
            {att.days?.startDate &&
              formatTime(att.days.startDate, "hh:mm:ss a")}
          </p>
        </div>
        <div className="flex gap-3 items-center mb-5">
          <label className="capitalize text-xl w-[150px]">end time : </label>

          <p className="flex-1 text-xl capitalize px-3 py-2 ">
            {att.days?.endDate && formatTime(att.days.endDate, "hh:mm:ss a")}
          </p>
        </div>
        {!att.days?.endDate && (
          <form
            action={async () => {
              "use server";
              if (!att.days?.startDate) {
                await setInAction(new Date());
              } else {
                await setOutAction(att.days?.startDate, new Date());
              }
            }}
          >
            <button className="capitalize text-xl bg-blue-300 mt-7 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 w-full">
              {!att.days?.startDate ? "set In" : "set out"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
