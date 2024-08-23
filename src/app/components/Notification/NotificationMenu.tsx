import cn from "@/lib/cssConditional";
import { NotificationTypes } from "@/types/Enums";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  notifications: NotificationMessage[];
};

export default function NotificationMenu({ notifications }: Props) {
  return (
    <div className="absolute min-w-max p-3 right-0 top-full z-50 translate-y-3 bg-black-400  rounded-lg before:absolute before:w-0 before:h-0 before:border-[10px] before:top-0 before:right-0 before:-translate-y-[calc(100%-5px)] before:border-transparent before:border-b-black-400 backdrop:blur-lg shadow-lg shadow-black-100">
      <h3 className="text-3xl mb-3 mt-3">notifications</h3>
      <ul className="space-y-3">
        {notifications.map((notify, ind) => (
          <>
            {ind !== 0 && <hr />}
            <li
              key={notify.id}
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
                    go to {notify.name} page{" "}
                    <FaArrowRight className="text-sm" />
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
          </>
        ))}
      </ul>
    </div>
  );
}
