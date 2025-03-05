"use client";

import { useEffect, useRef, useState } from "react";
import Pusher, { Channel } from "pusher-js";
import { Role } from "@/types/Enums";
import { useSession } from "next-auth/react";

/**
 *
 * @returns [unReadNotifications,clearNotifications,channel]
 */
export default function useCLientPusherConnect(): [
  number,
  () => void,
  Channel | null
] {
  const [unReadNotifications, setUnReadNotifications] = useState(0);
  const channel = useRef<Channel | null>(null);
  const user = useSession().data?.user;

  useEffect(() => {
    const getNotifications = async () => {
      const res = await fetch("/api/notifications/unReadCount");
      if (!res.ok) return;
      const count = (await res.json()) as number;
      setUnReadNotifications(count);
    };
    getNotifications();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      if (user) {
        const pusher = new Pusher("a2a05997f41c1ec741ab", { cluster: "eu" });
        channel.current = pusher.subscribe(
          user.role === Role.ADMIN ? "admin" : user.userId.toString()
        );
        channel.current.bind("notification", () => {
          setUnReadNotifications((prev) => prev + 1);
        });
      }
    };
    getNotification();
    return () => {
      channel.current?.unbind_all();
      channel.current?.unsubscribe();
    };
  }, [user]);

  return [
    unReadNotifications,
    () => {
      setUnReadNotifications(0);
    },
    channel.current,
  ];
}
