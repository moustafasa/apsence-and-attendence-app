"use client";
import { IoNotifications } from "react-icons/io5";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import NotificationMenu from "./NotificationMenu";
import useCLientPusherConnect from "@/lib/useCLientPusherConnect";

export default function NotificationButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, unReadNotifications, readAllNotifications, markAsRead] =
    useCLientPusherConnect();
  const asReadTimeout = useRef<NodeJS.Timeout>();

  const markAsReadOnHide = useCallback(() => {
    clearTimeout(asReadTimeout.current);
    if (showMenu) {
      console.log("done");
      asReadTimeout.current = setTimeout(() => {
        markAsRead();
      }, 1000);
    }
  }, [markAsRead, showMenu]);

  useEffect(() => {
    const hideMenuOnBlur = (e: MouseEvent) => {
      const element = e.target as HTMLElement | null;

      if (!element?.closest("#notif-menu")) {
        markAsReadOnHide();
        setShowMenu(false);
      }
    };
    document.addEventListener("click", hideMenuOnBlur);
    return () => {
      document.removeEventListener("click", hideMenuOnBlur);
    };
  }, [markAsReadOnHide]);

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
    <div className=" flex items-center relative h-full " id="notif-menu">
      <button
        className="text-xl relative"
        onClick={async (e) => {
          markAsReadOnHide();
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
      <Suspense fallback={<div>loading...</div>}>
        {showMenu && <NotificationMenu notifications={notifications} />}
      </Suspense>
    </div>
  );
}
