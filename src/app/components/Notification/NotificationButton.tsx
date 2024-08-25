"use client";
import { IoNotifications } from "react-icons/io5";
import Pusher from "pusher-js";
import { Suspense, useEffect, useState } from "react";
import { Role } from "@/types/Enums";
import { getCurrentUser, getUserNotificationAction } from "@/lib/actions";
import NotificationMenu from "./NotificationMenu";
import { toast } from "react-toastify";

export default function NotificationButton() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      const notif = await getUserNotificationAction();
      if (notif) {
        setNotifications(notif || []);
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
          toast("this is notification", { position: "top-right" });
        });
      }
    };
    getNotification();
  }, []);

  return (
    <div className=" flex items-center relative h-full ">
      <button
        className="text-xl relative"
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}
      >
        <sub className="grid place-content-center text-xs bg-red-600 absolute aspect-square h-5  left-0 top-0 -translate-x-1/2 -translate-y-1/2  rounded-full ">
          {notifications.filter((notify) => !notify.read).length}
        </sub>
        <IoNotifications />
      </button>
      <Suspense fallback={<div>loading...</div>}>
        {showMenu && <NotificationMenu notifications={notifications} />}
      </Suspense>
    </div>
  );
}
