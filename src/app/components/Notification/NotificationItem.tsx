import cn from "@/lib/cssConditional";
import { NotificationTypes } from "@/types/Enums";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  notify: NotificationMessage;
};

export default function NotificationItem({ notify }: Props) {
  return (
    <li
      className={cn("p-3 capitalize rounded-lg", {
        "bg-black-300": !notify.read,
      })}
    >
      {notify.type === NotificationTypes.SALARY_REQUEST && (
        <div>
          <strong className="text-xl inline-block me-2 text-blue-400">
            {notify.name} :
          </strong>{" "}
          ask you to paid his salary
          <Link
            className="text-sm flex items-center justify-center gap-2 hover:text-blue-300 transition-colors duration-300  mt-3 "
            href={`/dashboard/view/${notify.from}`}
          >
            go to {notify.name} page <FaArrowRight className="text-sm" />
          </Link>
        </div>
      )}
      {notify.type === NotificationTypes.SALARY_PAID && (
        <div>
          <strong className="text-xl inline-block me-2 text-blue-400">
            {notify.name} :
          </strong>{" "}
          paid your salary
        </div>
      )}
    </li>
  );
}
