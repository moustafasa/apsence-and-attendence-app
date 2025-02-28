import Skeleton from "./Skeleton";

export default function EditEmployeeSkeleton() {
  return (
    <div className="mt-10 flex flex-col max-w-[700px] mx-auto">
      <Skeleton classNames=" sk-header w-[70%] mx-auto mb-6 mt-20" />

      <div className="flex gap-3 items-center mb-5">
        <Skeleton classNames="sk-text w-[150px]" />
        <Skeleton classNames="sk-input flex-1" />
      </div>
      <Skeleton classNames="mt-7 p-3 sk-button !w-full" />
    </div>
  );
}
