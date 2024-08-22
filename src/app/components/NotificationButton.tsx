"use client";
import { IoNotifications } from "react-icons/io5";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { NotificationTypes, Role } from "@/types/Enums";
import { getCurrentUser, getUserNotificationAction } from "@/lib/actions";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function NotificationButton() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

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
        });
      }
    };
    getNotification();
  }, []);

  return (
    <div className=" flex items-center relative h-full ">
      <button className="text-xl relative">
        <sub className="grid place-content-center text-xs bg-red-600 absolute aspect-square h-5  left-0 top-0 -translate-x-1/2 -translate-y-1/2  rounded-full ">
          {notifications.filter((notify) => !notify.read).length}
        </sub>
        <IoNotifications />
      </button>
      <div className="absolute min-w-max p-3 right-0 top-full z-50 translate-y-3 bg-black-400  rounded-lg before:absolute before:w-0 before:h-0 before:border-[10px] before:top-0 before:right-0 before:-translate-y-[calc(100%-5px)] before:border-transparent before:border-b-black-400 backdrop:blur-lg shadow-lg shadow-black-100">
        <h3 className="text-3xl mb-3 mt-3">notifications</h3>
        <ul>
          {notifications.map((notify) => (
            <li
              key={notify.id}
              className="px-3 py-4 capitalize [&:not(:last-child)]:border-b-[1px]"
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
          ))}
        </ul>
      </div>
    </div>
  );
}
