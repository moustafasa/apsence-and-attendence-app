"use client";
import { IoNotifications } from "react-icons/io5";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { pusherConnect } from "@/lib/PusherConnect";

export default function NotificationButton() {
  useEffect(() => {
    const pusher = new Pusher("8bd15854ea58c1783a94", { cluster: "eu" });
    const channel = pusher.subscribe("notification");
    channel.bind("new", (data: { message: string }) => {
      console.log(data);
    });
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
