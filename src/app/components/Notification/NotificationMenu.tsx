import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import { readNotificationsAction } from "@/lib/actions/notificationActions";
import cn from "@/lib/cssConditional";
import { Channel } from "pusher-js";
import AdminNotificationSkeleton from "../skeleton/AdminNotificationSkeleton";

type Props = {
  channel: Channel | null;
};
export default function NotificationMenu({ channel }: Props) {
  const [notifications, setNotifications] = useState<
    INotificationsMsgPopulated[]
  >([]);
  const [loading, setLoading] = useState(false);

  const asReadTimeout = useRef<NodeJS.Timeout>();

  const markAsReadOnHide = useCallback(() => {
    clearTimeout(asReadTimeout.current);
    asReadTimeout.current = setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      markAsReadOnHide();
    };
  }, [markAsReadOnHide]);

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const notifications = (await res.json()) as INotificationsMsgPopulated[];
      setNotifications(notifications);
      setLoading(false);
    };
    getNotifications();
  }, []);

  useEffect(() => {
    if (!channel) return;
    const notificationHandler = (data: { message: string }) => {
      const newMsg = JSON.parse(data.message) as INotificationsMsgPopulated;
      setNotifications((prev) => [newMsg, ...prev]);
    };
    channel.bind("notification", notificationHandler);
    return () => {
      channel.unbind("notification", notificationHandler);
    };
  }, [channel]);

  useEffect(() => {
    const readNotif = async () => {
      await readNotificationsAction();
    };
    readNotif();
  }, [notifications]);

  return (
    <div
      className={cn(
        "absolute min-w-max p-5 pb-6 md:left-auto md:right-0 top-full z-50 translate-y-3 bg-black-400  rounded-lg md:before:absolute md:before:w-0 md:before:h-0 md:before:border-[10px] md:before:top-0 md:before:right-0 md:before:-translate-y-[calc(100%-5px)] md:before:border-transparent md:before:border-b-black-400 backdrop:blur-lg shadow-lg shadow-black-100  left-[10px] w-[calc(100%-20px)]  md:w-auto "
      )}
    >
      <h3 className="text-3xl mb-3 mt-3">notifications</h3>
      <ul className=" overflow-auto max-h-[50vh] [&::-webkit-scrollbar]:hidden ">
        {loading && (
          <>
            <AdminNotificationSkeleton />
          </>
        )}
        {notifications.map((notify, ind) => (
          <Fragment key={notify._id}>
            {ind !== 0 && <hr />}
            <NotificationItem notify={notify} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
