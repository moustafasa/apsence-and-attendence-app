import cn from "@/lib/cssConditional";
import { NotificationTypes } from "@/types/Enums";
import { tz } from "@date-fns/tz";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  notify: INotificationsMsgPopulated;
};

export default function NotificationItem({ notify }: Props) {
  const timeStampToNow = useMemo(
    () =>
      formatDistanceToNow(new Date(notify.createdAt), {
        addSuffix: true,
        in: tz("Africa/Cairo"),
      }),
    [notify.createdAt]
  );

  return (
    <li
      className={cn(" p-3 capitalize rounded-lg", {
        "bg-black-300": !notify.read,
      })}
    >
      {notify.type === NotificationTypes.SALARY_REQUEST && (
        <div>
          <strong className="text-xl inline-block me-2 text-blue-400">
            {notify.from.name}:
          </strong>{" "}
          ask you to paid his salary{" "}
          <span className="flex items-center justify-between gap-3 mt-3 ">
            <Link
              className="text-sm flex items-center justify-center gap-2 hover:text-blue-300 transition-colors duration-300  "
              href={`/dashboard/view/${notify.from._id}`}
            >
              go to {notify.from.name} page <FaArrowRight className="text-sm" />
            </Link>
            <span className="text-xs text-[#bbb]">{timeStampToNow}</span>
          </span>
        </div>
      )}

      {notify.type === NotificationTypes.SALARY_PAID && (
        <div className="min-w-[300px]">
          <strong className="text-xl inline-block me-2 text-blue-400">
            {notify.from.name} :
          </strong>{" "}
          paid your salary
          <span className="block text-xs mt-3 text-right w-full text-[#bbb]">
            {timeStampToNow}
          </span>
        </div>
      )}
    </li>
  );
}
