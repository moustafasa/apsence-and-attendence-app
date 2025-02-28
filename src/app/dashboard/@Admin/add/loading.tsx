import Skeleton from "@/app/components/skeleton/Skeleton";

export default function loading() {
  return (
    <div className="mt-10 flex flex-col max-w-[700px] mx-auto">
      <Skeleton classNames=" sk-header w-[50%] mx-auto mb-6 p-3 mt-16" />
      <div className="flex gap-5 items-center mb-5">
        <Skeleton classNames=" sk-text w-[120px]" />
        <Skeleton classNames="sk-input flex-1" />
      </div>
      <div className="flex gap-5 items-center mb-5">
        <Skeleton classNames=" sk-text w-[120px]" />

        <Skeleton classNames="sk-input flex-1" />
      </div>
      <div className="flex gap-5 items-center mb-5">
        <Skeleton classNames=" sk-text w-[120px]" />
        <Skeleton classNames="sk-input flex-1" />
      </div>
      <div className="flex gap-5 items-center mb-5">
        <Skeleton classNames=" sk-text w-[120px]" />

        <Skeleton classNames="sk-input flex-1" />
      </div>
      <Skeleton classNames="sk-button !w-full mt-7 p-3 rounded-lg hover" />
    </div>
  );
}
