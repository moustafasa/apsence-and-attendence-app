"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, getUserNotificationAction } from "./actions";
import Pusher from "pusher-js";
import { Role } from "@/types/Enums";

/**
 *
 * @returns [notifications,unReadNotifications,clearNotifications,markAsUnRead]
 */
type readAllNotifications = () => void;
type markAsRead = readAllNotifications;
export default function useCLientPusherConnect(): [
  NotificationMessage[],
  number,
  readAllNotifications,
  markAsRead
] {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [unReadNotifications, setUnReadNotifications] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      const notif = await getUserNotificationAction();
      if (notif) {
        setNotifications(notif || []);
        setUnReadNotifications(notif.filter((notify) => !notify.read).length);
      }
    };
    getNotifications();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      const user = await getCurrentUser();
      if (user) {
        const pusher = new Pusher("4818efa720b6def4922e", { cluster: "eu" });
        const channel = pusher.subscribe(
          user.role === Role.ADMIN ? "admin" : user.userId.toString()
        );
        channel.bind("notification", (data: { message: string }) => {
          const parsedMessage = JSON.parse(data.message) as NotificationMessage;
          setNotifications((prev) => [parsedMessage, ...prev]);
          setUnReadNotifications((prev) => prev + 1);
        });
      }
    };
    getNotification();
  }, []);

  return [
    notifications,
    unReadNotifications,
    () => {
      setUnReadNotifications(0);
    },
    () => {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    },
  ];
}
