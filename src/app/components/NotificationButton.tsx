"use client";
import { IoNotifications } from "react-icons/io5";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Role } from "@/authTypes.d";
import { getCurrentUser, getUserNotificationAction } from "@/lib/actions";

export default function NotificationButton() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    const getNotifications = async () => {
      const notif = await getUserNotificationAction();
      if (notif) {
        setNotifications((prev) => [...prev, notif]);
      }
    };
    getNotifications();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      const user = await getCurrentUser();
      if (user) {
        const pusher = new Pusher("8bd15854ea58c1783a94", { cluster: "eu" });
        const channel = pusher.subscribe(
          user.role === Role.ADMIN ? "admin" : user.userId.toString()
        );
        channel.bind("notification", (data: { message: string }) => {
          const parsedMessage = JSON.parse(data.message) as NotificationMessage;
          setNotifications((prev) => [...prev, parsedMessage]);
        });
      }
    };
    getNotification();
  }, []);
  return (
    <button className="text-xl relative">
      <sub className="grid place-content-center text-xs bg-red-600 absolute aspect-square h-5  left-0 top-0 -translate-x-1/2 -translate-y-1/2  rounded-full ">
        10
      </sub>
      <IoNotifications />
    </button>
  );
}
