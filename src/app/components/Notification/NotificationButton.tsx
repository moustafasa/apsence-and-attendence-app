"use client";
import { IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";
import NotificationMenu from "./NotificationMenu";
import useCLientPusherConnect from "@/utilty/useCLientPusherConnect";

export default function NotificationButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [unReadNotifications, readAllNotifications, channel] =
    useCLientPusherConnect();

  useEffect(() => {
    const hideMenuOnBlur = (e: MouseEvent) => {
      const element = e.target as HTMLElement | null;

      if (!element?.closest("#notif-menu")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", hideMenuOnBlur);
    return () => {
      document.removeEventListener("click", hideMenuOnBlur);
    };
  }, []);

  useEffect(() => {
    const readNotifTimeout = setTimeout(() => {
      if (showMenu) {
        readAllNotifications();
      }
    }, 1000);

    return () => {
      clearTimeout(readNotifTimeout);
    };
  }, [showMenu, readAllNotifications]);

  return (
    <div className=" flex items-center md:relative h-full  " id="notif-menu">
      <button
        className="text-xl relative"
        onClick={async () => {
          setShowMenu((prev) => !prev);
        }}
      >
        {unReadNotifications > 0 && (
          <sub className="grid place-content-center text-xs bg-red-600 absolute aspect-square h-5  left-0 top-0 -translate-x-1/2 -translate-y-1/2  rounded-full ">
            {unReadNotifications}
          </sub>
        )}
        <IoNotifications />
      </button>
      {showMenu && <NotificationMenu channel={channel} />}
    </div>
  );
}
