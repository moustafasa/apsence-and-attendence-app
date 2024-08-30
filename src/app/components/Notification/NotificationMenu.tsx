import { readNotificationsAction } from "@/lib/actions";
import { Fragment, useEffect } from "react";
import NotificationItem from "./NotificationItem";

type Props = {
  notifications: NotificationMessage[];
};

export default function NotificationMenu({ notifications }: Props) {
  useEffect(() => {
    const readNotif = async () => {
      await readNotificationsAction();
    };
    readNotif();
  }, [notifications]);

  return (
    <div className="absolute min-w-max p-3 right-0 top-full z-50 translate-y-3 bg-black-400  rounded-lg before:absolute before:w-0 before:h-0 before:border-[10px] before:top-0 before:right-0 before:-translate-y-[calc(100%-5px)] before:border-transparent before:border-b-black-400 backdrop:blur-lg shadow-lg shadow-black-100 ">
      <h3 className="text-3xl mb-3 mt-3">notifications</h3>
      <ul className="space-y-3 overflow-auto max-h-[50vh]">
        {notifications.map((notify, ind) => (
          <Fragment key={notify.id}>
            {ind !== 0 && <hr />}
            <NotificationItem notify={notify} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
