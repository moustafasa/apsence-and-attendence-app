import Skeleton from "./Skeleton";

export default function SetAttendenceSkeleton() {
  return (
    <div className="mt-10 flex flex-col max-w-[700px] mx-auto">
      <h2 className=" text-center capitalize text-3xl mb-6 font-bold p-3">
        set today attendence
      </h2>
      <div className="flex gap-3 items-center mb-5">
        <span className="capitalize text-xl w-[150px]">day date : </span>
        <p className="flex-1 px-3 py-2 ">
          <Skeleton classNames="sk-text" />
        </p>
      </div>
      <div className="flex gap-3 items-center mb-5">
        <label className="capitalize text-xl w-[150px]">start time : </label>
        <p className="flex-1 px-3 py-2 ">
          <Skeleton classNames="sk-text" />
        </p>
      </div>
      <div className="flex gap-3 items-center mb-5">
        <label className="capitalize text-xl w-[150px]">end time : </label>

        <p className="flex-1 px-3 py-2 ">
          <Skeleton classNames="sk-text" />
        </p>
      </div>
      <Skeleton classNames="sk-button mt-7 p-3 rounded-lg !w-full "></Skeleton>
    </div>
  );
}
